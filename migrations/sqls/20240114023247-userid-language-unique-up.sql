ALTER TABLE UserLanguages
ADD CONSTRAINT unique_userid_language_constraint UNIQUE (userId, language);
