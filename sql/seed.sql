insert into public.categories (name, slug, description)
values
  ('Constitutional Law', 'constitutional-law', 'Constitutional interpretation, public institutions, rights, and separation of powers.'),
  ('Criminal Law', 'criminal-law', 'Criminal justice, procedure, evidence, sentencing, and reform.'),
  ('Administrative Law', 'administrative-law', 'Administrative procedure, public authorities, judicial review, and regulatory practice.'),
  ('Corporate Law', 'corporate-law', 'Company law, governance, transactions, compliance, and commercial legal practice.'),
  ('Civil Law', 'civil-law', 'Private law, obligations, property, family law, and civil procedure.'),
  ('International Law', 'international-law', 'Public international law, treaties, international institutions, and cross-border analysis.'),
  ('EU Law', 'eu-law', 'European Union law, approximation, comparative regulation, and integration analysis.'),
  ('Human Rights', 'human-rights', 'Domestic, European, and international human rights analysis.'),
  ('Labor Law', 'labor-law', 'Employment law, workplace rights, labor relations, and social protection.'),
  ('Tax Law', 'tax-law', 'Taxation, fiscal policy, compliance, and tax dispute analysis.'),
  ('Legal Theory', 'legal-theory', 'Jurisprudence, legal method, interpretation, and philosophy of law.'),
  ('Court Decisions', 'court-decisions', 'Case comments, judgment analysis, and procedural developments.'),
  ('Legal Reform', 'legal-reform', 'Legal gaps, institutional reform, policy proposals, and legislative analysis.'),
  ('Student Research', 'student-research', 'Reviewed legal writing by students and early-career researchers.')
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description;

insert into public.tags (name, slug)
values
  ('case comment', 'case-comment'),
  ('legal reform', 'legal-reform'),
  ('public law', 'public-law'),
  ('corporate governance', 'corporate-governance'),
  ('human rights', 'human-rights'),
  ('student research', 'student-research')
on conflict (slug) do nothing;

-- After signing up the first administrator, run a statement like:
-- update public.profiles
-- set role = 'admin'
-- where id = (select id from auth.users where email = 'you@example.com');
