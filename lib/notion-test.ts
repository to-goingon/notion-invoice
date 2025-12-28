import { notion, DATABASE_ID } from "./notion";

/**
 * Test Notion API connection
 * This is a development utility to verify the Notion API setup
 */
export async function testNotionConnection() {
  try {
    await notion.databases.retrieve({
      database_id: DATABASE_ID,
    });

    console.log("✅ Notion API 연결 성공");
    console.log("Database retrieved successfully");
    console.log("Database ID:", DATABASE_ID);

    return true;
  } catch (error) {
    console.error("❌ Notion API 연결 실패:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }

    return false;
  }
}

/**
 * Quick test that can be run from the browser console or server
 */
if (typeof window === "undefined" && process.env.NODE_ENV === "development") {
  // Only run in server-side development mode
  testNotionConnection().catch(console.error);
}
