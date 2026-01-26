import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "boats_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  DROP TABLE "boats_gallery" CASCADE;
  ALTER TABLE "boats_rels" ADD CONSTRAINT "boats_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."boats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "boats_rels" ADD CONSTRAINT "boats_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "boats_rels_order_idx" ON "boats_rels" USING btree ("order");
  CREATE INDEX "boats_rels_parent_idx" ON "boats_rels" USING btree ("parent_id");
  CREATE INDEX "boats_rels_path_idx" ON "boats_rels" USING btree ("path");
  CREATE INDEX "boats_rels_media_id_idx" ON "boats_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "boats_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  DROP TABLE "boats_rels" CASCADE;
  ALTER TABLE "boats_gallery" ADD CONSTRAINT "boats_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "boats_gallery" ADD CONSTRAINT "boats_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."boats"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "boats_gallery_order_idx" ON "boats_gallery" USING btree ("_order");
  CREATE INDEX "boats_gallery_parent_id_idx" ON "boats_gallery" USING btree ("_parent_id");
  CREATE INDEX "boats_gallery_image_idx" ON "boats_gallery" USING btree ("image_id");`)
}
