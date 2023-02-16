<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230216124800 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE animal_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE form_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE form_scheme_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE media_object_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE walk_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE adoption (user_id INT NOT NULL, animal_id INT NOT NULL, date DATE NOT NULL, PRIMARY KEY(user_id, animal_id))');
        $this->addSql('CREATE INDEX IDX_EDDEB6A9A76ED395 ON adoption (user_id)');
        $this->addSql('CREATE INDEX IDX_EDDEB6A98E962C16 ON adoption (animal_id)');
        $this->addSql('CREATE TABLE animal (id INT NOT NULL, species VARCHAR(255) NOT NULL, breed VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, birth_date DATE NOT NULL, intake_date DATE NOT NULL, description VARCHAR(2000) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE form (id INT NOT NULL, form_scheme_id INT NOT NULL, user_id INT DEFAULT NULL, animal_id INT DEFAULT NULL, content JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5288FD4F1479C76E ON form (form_scheme_id)');
        $this->addSql('CREATE INDEX IDX_5288FD4FA76ED395 ON form (user_id)');
        $this->addSql('CREATE INDEX IDX_5288FD4F8E962C16 ON form (animal_id)');
        $this->addSql('CREATE TABLE form_scheme (id INT NOT NULL, name VARCHAR(255) NOT NULL, content JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE media_object (id INT NOT NULL, domain VARCHAR(255) NOT NULL, file_path VARCHAR(255) DEFAULT NULL, is_main BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE site_meta (meta_key VARCHAR(255) NOT NULL, string_value VARCHAR(255) DEFAULT NULL, json_value JSON DEFAULT NULL, PRIMARY KEY(meta_key))');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) DEFAULT NULL, surname VARCHAR(255) DEFAULT NULL, pesel VARCHAR(11) DEFAULT NULL, phone VARCHAR(255) DEFAULT NULL, roles JSON NOT NULL, street VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(5) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('CREATE TABLE walk (id INT NOT NULL, animal_id INT DEFAULT NULL, user_id INT DEFAULT NULL, date DATE NOT NULL, begin_time TIME(0) WITHOUT TIME ZONE NOT NULL, end_time TIME(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8D917A558E962C16 ON walk (animal_id)');
        $this->addSql('CREATE INDEX IDX_8D917A55A76ED395 ON walk (user_id)');
        $this->addSql('ALTER TABLE adoption ADD CONSTRAINT FK_EDDEB6A9A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE adoption ADD CONSTRAINT FK_EDDEB6A98E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4F1479C76E FOREIGN KEY (form_scheme_id) REFERENCES form_scheme (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4FA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4F8E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE walk ADD CONSTRAINT FK_8D917A558E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE walk ADD CONSTRAINT FK_8D917A55A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE animal_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE form_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE form_scheme_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE media_object_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE walk_id_seq CASCADE');
        $this->addSql('ALTER TABLE adoption DROP CONSTRAINT FK_EDDEB6A9A76ED395');
        $this->addSql('ALTER TABLE adoption DROP CONSTRAINT FK_EDDEB6A98E962C16');
        $this->addSql('ALTER TABLE form DROP CONSTRAINT FK_5288FD4F1479C76E');
        $this->addSql('ALTER TABLE form DROP CONSTRAINT FK_5288FD4FA76ED395');
        $this->addSql('ALTER TABLE form DROP CONSTRAINT FK_5288FD4F8E962C16');
        $this->addSql('ALTER TABLE walk DROP CONSTRAINT FK_8D917A558E962C16');
        $this->addSql('ALTER TABLE walk DROP CONSTRAINT FK_8D917A55A76ED395');
        $this->addSql('DROP TABLE adoption');
        $this->addSql('DROP TABLE animal');
        $this->addSql('DROP TABLE form');
        $this->addSql('DROP TABLE form_scheme');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP TABLE site_meta');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE walk');
    }
}
