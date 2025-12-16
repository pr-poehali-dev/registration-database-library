import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API для управления реестром детских и молодежных объединений
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    
    try:
        if method == 'GET':
            return get_organizations(conn, event)
        elif method == 'POST':
            return create_organization(conn, event)
        elif method == 'PUT':
            return update_organization(conn, event)
        elif method == 'DELETE':
            return delete_organization(conn, event)
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    finally:
        conn.close()

def get_organizations(conn, event: Dict[str, Any]) -> Dict[str, Any]:
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    params = event.get('queryStringParameters') or {}
    org_id = params.get('id')
    
    if org_id:
        cursor.execute(
            'SELECT * FROM youth_organizations WHERE id = %s',
            (org_id,)
        )
        result = cursor.fetchone()
        if not result:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Organization not found'}),
                'isBase64Encoded': False
            }
        data = dict(result)
    else:
        cursor.execute(
            'SELECT * FROM youth_organizations ORDER BY number ASC'
        )
        results = cursor.fetchall()
        data = [dict(row) for row in results]
    
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(data, default=str),
        'isBase64Encoded': False
    }

def create_organization(conn, event: Dict[str, Any]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute('''
        INSERT INTO youth_organizations (
            number, municipality, educational_institution, organization_name,
            contact_details, participants_count, activity_direction,
            local_act_details, website_url
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *
    ''', (
        body_data['number'],
        body_data['municipality'],
        body_data['educational_institution'],
        body_data['organization_name'],
        body_data['contact_details'],
        body_data['participants_count'],
        body_data['activity_direction'],
        body_data['local_act_details'],
        body_data.get('website_url', '')
    ))
    
    result = cursor.fetchone()
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(dict(result), default=str),
        'isBase64Encoded': False
    }

def update_organization(conn, event: Dict[str, Any]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    org_id = body_data.get('id')
    
    if not org_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'ID is required'}),
            'isBase64Encoded': False
        }
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute('''
        UPDATE youth_organizations SET
            number = %s,
            municipality = %s,
            educational_institution = %s,
            organization_name = %s,
            contact_details = %s,
            participants_count = %s,
            activity_direction = %s,
            local_act_details = %s,
            website_url = %s,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
        RETURNING *
    ''', (
        body_data['number'],
        body_data['municipality'],
        body_data['educational_institution'],
        body_data['organization_name'],
        body_data['contact_details'],
        body_data['participants_count'],
        body_data['activity_direction'],
        body_data['local_act_details'],
        body_data.get('website_url', ''),
        org_id
    ))
    
    result = cursor.fetchone()
    conn.commit()
    cursor.close()
    
    if not result:
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Organization not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(dict(result), default=str),
        'isBase64Encoded': False
    }

def delete_organization(conn, event: Dict[str, Any]) -> Dict[str, Any]:
    params = event.get('queryStringParameters') or {}
    org_id = params.get('id')
    
    if not org_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'ID is required'}),
            'isBase64Encoded': False
        }
    
    cursor = conn.cursor()
    cursor.execute('DELETE FROM youth_organizations WHERE id = %s', (org_id,))
    conn.commit()
    
    if cursor.rowcount == 0:
        cursor.close()
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Organization not found'}),
            'isBase64Encoded': False
        }
    
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Organization deleted successfully'}),
        'isBase64Encoded': False
    }
