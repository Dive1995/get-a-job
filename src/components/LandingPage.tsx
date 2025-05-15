import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <main className="min-h-screen  text-gray-800">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center bg-[#4fa252] text-white rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Your Smart Job Search Companion
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Create tailored cover letters and CVs with AI, and track your job
          applications — all in one place.
        </p>
        <Button className="text-white bg-white/20 hover:bg-white/30">
          Get Started For Free
        </Button>
      </section>

      {/* Features */}
      <section className="py-20 px-6 ">
        <h2 className="text-3xl font-semibold text-center mb-12 text-[#4fa252]">
          Why Use Our App?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "AI-Powered Cover Letters",
              desc: "Generate personalized cover letters in seconds, tailored to each job.",
            },
            {
              title: "Resume Builder",
              desc: "Quickly build and export modern, professional resumes with ease.",
            },
            {
              title: "Job Application Tracker",
              desc: "Keep track of the roles you've applied to and stay organized.",
            },
          ].map((feature, i) => (
            <Card key={i} className="shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#4fa252]">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 my-20 px-6 bg-[#f0fdf4] text-center rounded-2xl shadow-sm">
        <h2 className="text-3xl font-semibold mb-6 text-[#4fa252]">
          See It In Action
        </h2>
        <video
          src="/demovideo.mp4"
          controls
          className="mx-auto rounded-2xl shadow-xl w-full max-w-4xl"
        />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#4fa252] text-white text-center rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Land Your Next Job?
        </h2>
        <p className="text-lg mb-6">
          Join other professionals using AI to simplify their job search.
        </p>
        <Button className="bg-white text-[#4fa252] hover:bg-gray-100">
          Try It Now
        </Button>
      </section>
    </main>
  );
}
