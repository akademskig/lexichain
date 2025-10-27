import { NextResponse } from "next/server";
import { prisma } from "@repo/database";

// GET /api/courses/enrolled - Fetch only enrolled courses for the current user
export async function GET() {
  try {
    // TODO: Get userId from session when auth is implemented
    // For now, get the demo user by email
    const user = await prisma.user.findUnique({
      where: { email: "demo@lexichain.com" },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user.id;

    // Fetch courses where user has CourseProgress (enrolled)
    const enrolledCourses = await prisma.course.findMany({
      where: {
        courseProgress: {
          some: {
            userId,
            isEnrolled: true,
          },
        },
      },
      include: {
        _count: {
          select: { sections: true },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        courseProgress: {
          where: {
            userId,
            isEnrolled: true,
          },
          select: {
            enrolledAt: true,
            sectionsCompleted: true,
            decksCompleted: true,
            cardsLearned: true,
            totalReviews: true,
            experienceGained: true,
            isCompleted: true,
            completedAt: true,
            lastStudiedAt: true,
          },
        },
      },
      orderBy: {
        courseProgress: {
          _count: "desc", // Most recently enrolled first
        },
      },
    });

    // Transform response
    const transformedCourses = enrolledCourses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      language: course.language,
      icon: course.icon,
      color: course.color,
      difficulty: course.difficulty,
      requiredLevel: course.requiredLevel,
      experienceGain: course.experienceGain,
      totalSections: course._count.sections,
      totalDecks: course.totalDecks,
      totalCards: course.totalCards,
      isEnrolled: true, // All courses from this endpoint are enrolled
      author: course.user,
      courseProgress: course.courseProgress,
    }));

    return NextResponse.json(transformedCourses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrolled courses" },
      { status: 500 },
    );
  }
}
