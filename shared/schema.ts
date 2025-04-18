import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const birthdayConfigs = pgTable("birthday_configs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  recipientName: text("recipient_name").notNull(),
  birthdayDate: timestamp("birthday_date").notNull(),
  birthdayMessage: text("birthday_message").notNull(),
  age: integer("age").notNull(),
  theme: text("theme").notNull().default("default"),
  photos: jsonb("photos").notNull()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBirthdayConfigSchema = createInsertSchema(birthdayConfigs).omit({
  id: true,
  userId: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBirthdayConfig = z.infer<typeof insertBirthdayConfigSchema>;
export type BirthdayConfig = typeof birthdayConfigs.$inferSelect;

export type Photo = {
  id: string;
  src: string;
  description: string;
};
