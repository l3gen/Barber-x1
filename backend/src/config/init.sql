CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'client',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS barbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  bio TEXT,
  avatar_url VARCHAR(255),
  specialties TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  duration_minutes INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES users(id),
  barber_id UUID REFERENCES barbers(id),
  service_id UUID REFERENCES services(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed data
INSERT INTO services (name, description, duration_minutes, price) VALUES
  ('Haircut', 'Classic cut and style', 30, 35.00),
  ('Beard Trim', 'Shape and trim beard', 20, 20.00),
  ('Haircut + Beard', 'Full service cut and beard', 50, 50.00),
  ('Hot Towel Shave', 'Traditional straight razor shave', 40, 45.00),
  ('Fade', 'Skin fade or taper', 35, 40.00)
ON CONFLICT DO NOTHING;

INSERT INTO barbers (name, bio, specialties) VALUES
  ('Marcus Johnson', '10 years experience, specializes in fades', ARRAY['Fades', 'Designs', 'Beard']),
  ('DeShawn Williams', 'Master barber, classic and modern cuts', ARRAY['Classic Cuts', 'Hot Shave', 'Lineups']),
  ('Carlos Rivera', 'Texture specialist and color work', ARRAY['Textured Hair', 'Color', 'Fades'])
ON CONFLICT DO NOTHING;
