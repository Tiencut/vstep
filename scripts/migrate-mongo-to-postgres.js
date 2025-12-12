/*
  Script: migrate-mongo-to-postgres.js
  Usage:
    - Set env MONGO_URL (mongodb connection string)
    - Run: node scripts/migrate-mongo-to-postgres.js

  This script is a simple exporter from the `exams` collection in MongoDB
  and imports into Prisma-managed Postgres `Quiz` and `QuizQuestion` tables.

  Review and test in a staging environment before running on production data.
*/

const { MongoClient } = require('mongodb');
const { PrismaClient } = require('@prisma/client');

async function migrate() {
  const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
  const mongoDbName = process.env.MONGO_DB || 'test';

  const mongo = new MongoClient(mongoUrl);
  const prisma = new PrismaClient();

  try {
    await mongo.connect();
    console.log('Connected to MongoDB');
    const db = mongo.db(mongoDbName);
    const exams = db.collection('exams');

    const cursor = exams.find({});
    let count = 0;
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      // Basic mapping: Exam -> Quiz, Question -> QuizQuestion, options -> QuizQuestionOption
      const quiz = await prisma.quiz.create({
        data: {
          title: doc.examName || 'Imported exam',
          order: 0,
          state: 'created',
          QuizMetaData: { create: { fullGrade: doc.questionCount || 0 } },
          Questions: {
            create: (doc.questions || []).map((q, idx) => ({
              order: idx + 1,
              questionText: q.questionText || '',
              questionType: 'multiple_choice',
              Options: {
                create: (q.options || []).map((opt, i) => ({ optionText: opt, order: i + 1 })),
              },
            })),
          },
        },
      });
      count++;
      if (count % 50 === 0) console.log(`Imported ${count} exams...`);
    }
    console.log(`Imported ${count} exams total.`);
  } catch (err) {
    console.error('Migration error', err);
  } finally {
    await prisma.$disconnect();
    await mongo.close();
  }
}

migrate();
