-- Add image_url column to hotels
alter table if exists public.hotels
  add column if not exists image_url text;


