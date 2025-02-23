import {serial,pgTable,text,varchar} from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
    id: serial("id").primaryKey(),
    jsonMockResp: text("jsonMockResp").notNull(),
    jobPosition: varchar("jobPosition", 255).notNull(),
    jobDesc: varchar("jobDesc", 255).notNull(),
    jobExperience: varchar("jobExperience", 255).notNull(),
    CreatedBy: varchar("createdby", 255).notNull(),
    CreatedAt: varchar("createdAt", 255), 
    mockId: varchar("mockid", 255).notNull()
});

export const UserAnswer=pgTable('userAnswer',{
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    CreatedAt:varchar('createdAt')

    

})