CREATE TABLE IF NOT EXISTS t_p54774028_landing_structure_cr.personal_offers (
    id BIGSERIAL PRIMARY KEY,
    program TEXT NOT NULL CHECK (program IN ('garden', 'prod')),
    child_name TEXT NOT NULL,
    tariff_name TEXT NOT NULL,
    price_month INTEGER NOT NULL CHECK (price_month > 0),
    comment TEXT NOT NULL DEFAULT '',
    code TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    contract_id BIGINT REFERENCES t_p54774028_landing_structure_cr.contracts (id)
);

CREATE INDEX IF NOT EXISTS idx_personal_offers_status_created ON t_p54774028_landing_structure_cr.personal_offers (status, created_at DESC);