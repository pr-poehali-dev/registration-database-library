CREATE TABLE IF NOT EXISTS youth_organizations (
    id SERIAL PRIMARY KEY,
    number INTEGER NOT NULL,
    municipality VARCHAR(255) NOT NULL,
    educational_institution VARCHAR(500) NOT NULL,
    organization_name VARCHAR(500) NOT NULL,
    contact_details TEXT NOT NULL,
    participants_count INTEGER NOT NULL,
    activity_direction VARCHAR(500) NOT NULL,
    local_act_details TEXT NOT NULL,
    website_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_youth_org_municipality ON youth_organizations(municipality);
CREATE INDEX idx_youth_org_direction ON youth_organizations(activity_direction);
CREATE INDEX idx_youth_org_name ON youth_organizations(organization_name);