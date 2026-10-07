CREATE TABLE IF NOT EXISTS contract_codes (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    code_hash TEXT NOT NULL,
    form_json TEXT NOT NULL,
    attempts INT NOT NULL DEFAULT 0,
    blocked_until TIMESTAMPTZ,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contract_codes_email_created ON contract_codes (email, created_at DESC);

CREATE TABLE IF NOT EXISTS contracts (
    id BIGSERIAL PRIMARY KEY,
    signed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    tariff TEXT NOT NULL,
    ip TEXT,
    status TEXT NOT NULL DEFAULT 'Подписан',
    form_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS form_rate_limit (
    id BIGSERIAL PRIMARY KEY,
    ip TEXT NOT NULL,
    scope TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_form_rate_limit_ip_scope_created ON form_rate_limit (ip, scope, created_at);