CREATE TABLE "users"(
    "id" SERIAL NOT NULL,
    "vk_id" BIGINT NOT NULL,
    "balance" BIGINT NOT NULL DEFAULT '0',
    "level" BIGINT NOT NULL DEFAULT '1'
);

CREATE INDEX "users_vk_id_index" ON "users"("vk_id");

ALTER TABLE
    "users"
ADD
    PRIMARY KEY("id");