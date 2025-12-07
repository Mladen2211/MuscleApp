-- =============================================
-- MuscleApp POSTGRESQL SCHEMA
-- =============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Helper: auto updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 1. Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2. Roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- 3. Permissions
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- 4. Role ↔ Permissions
CREATE TABLE role_permissions (
    role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 5. User ↔ Roles (many-to-many)
CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

-- 6. Client-Coach Assignments
CREATE TABLE client_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    coach_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id INT NOT NULL REFERENCES roles(id),
    assigned_by UUID REFERENCES users(id),
    assigned_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    UNIQUE (client_id, coach_id, role_id),
    CHECK (client_id <> coach_id)
);
CREATE INDEX idx_client_assignments_client ON client_assignments(client_id, is_active);
CREATE INDEX idx_client_assignments_coach  ON client_assignments(coach_id, is_active);

-- 7. User Profiles (sensitive data)
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    birth_date DATE,
    gender VARCHAR(20),
    height_cm NUMERIC(5,2),
    weight_kg NUMERIC(5,2),
    activity_multiplier NUMERIC(4,3) DEFAULT 1.2,
    goal_key VARCHAR(50),
    goal_type VARCHAR(20),
    target_calories INT,
    target_protein_g INT,
    target_fat_g INT,
    target_carbs_g INT,
    profile_picture_url TEXT,
    notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    age INT GENERATED ALWAYS AS (EXTRACT(YEAR FROM age(CURRENT_DATE, birth_date))::INT) STORED
);
CREATE TRIGGER trg_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Daily Logs
CREATE TABLE daily_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    steps INT DEFAULT 0,
    is_trained BOOLEAN DEFAULT false,
    total_protein_g INT DEFAULT 0,
    total_fat_g INT DEFAULT 0,
    total_carbs_g INT DEFAULT 0,
    total_calories INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, log_date)
);
CREATE TRIGGER trg_daily_logs_updated_at BEFORE UPDATE ON daily_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX idx_daily_logs_user_date ON daily_logs(user_id, log_date DESC);

-- 9. Meals
CREATE TABLE meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    daily_log_id UUID NOT NULL REFERENCES daily_logs(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    protein_g INT DEFAULT 0,
    fat_g INT DEFAULT 0,
    carbs_g INT DEFAULT 0,
    calories INT GENERATED ALWAYS AS ((protein_g * 4) + (fat_g * 9) + (carbs_g * 4)) STORED,
    eaten_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_meals_log_id ON meals(daily_log_id);

-- 10. Exercises (optimized for your exact JSONs + CDN)
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL GENERATED ALWAYS AS (lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))) STORED,
    force VARCHAR(20),
    level VARCHAR(20) NOT NULL,
    mechanic VARCHAR(20),
    equipment VARCHAR(100),
    category VARCHAR(50) NOT NULL,
    primary_muscles JSONB NOT NULL DEFAULT '[]',
    secondary_muscles JSONB NOT NULL DEFAULT '[]',
    instructions TEXT[] NOT NULL DEFAULT '{}',
    image_main_url TEXT,
    image_side_url TEXT,
    is_public BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER trg_exercises_updated_at BEFORE UPDATE ON exercises
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Exercise indexes (instant filtering)
CREATE INDEX idx_exercises_level       ON exercises(level);
CREATE INDEX idx_exercises_category    ON exercises(category);
CREATE INDEX idx_exercises_equipment   ON exercises(equipment);
CREATE INDEX idx_exercises_force       ON exercises(force);
CREATE INDEX idx_exercises_primary     ON exercises USING GIN (primary_muscles);
CREATE INDEX idx_exercises_secondary   ON exercises USING GIN (secondary_muscles);
CREATE INDEX idx_exercises_search      ON exercises USING GIN (to_tsvector('english', name || ' ' || array_to_string(instructions, ' ')));

-- 11. Workouts
CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    notes TEXT,
    assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_workouts_user ON workouts(user_id, assigned_date DESC);

-- 12. Workout Exercises
CREATE TABLE workout_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    sets INT,
    reps VARCHAR(50),
    rest_seconds INT,
    order_index INT NOT NULL DEFAULT 0,
    notes TEXT
);
CREATE INDEX idx_workout_exercises_workout ON workout_exercises(workout_id);

-- 13. Refresh Tokens
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN DEFAULT false,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_hash ON refresh_tokens(token_hash);

-- =============================================
-- FULL SEED DATA
-- =============================================

-- Roles
INSERT INTO roles (name, description) VALUES
('admin', 'Full system access'),
('user', 'Standard client'),
('pt', 'Personal Trainer'),
('nutritionist', 'Nutrition specialist')
ON CONFLICT (name) DO NOTHING;

-- Permissions
INSERT INTO permissions (slug, description) VALUES
('system:manage',           'Manage system settings'),
('users:read_basic',        'Read basic user list'),
('clients:assign',          'Assign clients to coaches'),
('clients:view',            'View own clients'),
('profile:read_self',       'Read own profile'),
('profile:update_self',     'Update own profile'),
('profile:read_client',     'Read client profile'),
('profile:update_client',   'Update client profile'),
('daily_log:read_self',     'Read own logs'),
('daily_log:write_self',    'Write own logs'),
('daily_log:read_client',   'Read client logs'),
('daily_log:write_client',  'Write client logs'),
('workout:manage',          'Create/assign workouts'),
('workout:read_client',     'Read client workouts'),
('diet:manage',             'Manage nutrition plans')
ON CONFLICT (slug) DO NOTHING;

-- Role → Permission assignments
WITH r AS (SELECT id, name FROM roles), p AS (SELECT id, slug FROM permissions)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM r JOIN p ON (r.name, p.slug) IN (
    ('admin', 'system:manage'), ('admin', 'users:read_basic'), ('admin', 'clients:assign'),
    ('user', 'profile:read_self'), ('user', 'profile:update_self'),
    ('user', 'daily_log:read_self'), ('user', 'daily_log:write_self'),
    ('pt', 'clients:view'), ('pt', 'profile:read_client'), ('pt', 'daily_log:read_client'),
    ('pt', 'daily_log:write_client'), ('pt', 'workout:manage'), ('pt', 'workout:read_client'),
    ('nutritionist', 'clients:view'), ('nutritionist', 'profile:read_client'),
    ('nutritionist', 'daily_log:read_client'), ('nutritionist', 'diet:manage')
)
ON CONFLICT DO NOTHING;

