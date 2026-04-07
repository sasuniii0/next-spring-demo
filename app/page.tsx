// app/page.tsx
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export default async function Home() {
  let userDetails: any[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${API_URL}/users`, {
      cache: "no-store",
    });

    if (!res.ok) {
      error = `Backend returned ${res.status} error`;
    } else {
      const responseData = await res.json();
      
      if (responseData.code === "0000" && responseData.data) {
        // Accessing the custom user_details array
        userDetails = responseData.data.user_details || [];
      } else {
        error = responseData.message || "Invalid data format received";
      }
    }
  } catch (err: any) {
    console.error("Fetch error:", err);
    error = "Cannot connect to Spring Boot backend.";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black py-12 text-white">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent">
             Status Board
          </h1>
          {error ? (
            <p className="text-red-400 mt-3 text-lg font-medium">{error}</p>
          ) : (
            <p className="text-gray-400 mt-2">
              Monitoring {userDetails.length} Unique Tasks
            </p>
          )}
        </div>

        {error ? (
          <div className="bg-red-950/50 border border-red-500/30 rounded-2xl p-10 text-center max-w-2xl mx-auto">
            <p className="text-xl mb-4">Backend Connection Issue</p>
            <p className="text-gray-400 mb-6">Verify Spring Boot is running on port 8080.</p>
          </div>
        ) : userDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userDetails.map((user, index) => (
              /* FIX: Composite key (user_id + index) ensures React never sees duplicates */
              <Link key={`${user.user_id}-${index}`} href={`/todos/${user.user_id}`} className="group">
                <div className="h-full rounded-2xl p-[1px] bg-gradient-to-br from-orange-500/30 to-amber-500/20 hover:from-orange-400 hover:to-amber-400 transition-all duration-300">
                  <div className="h-full bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1">
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <p className={`text-base font-medium leading-snug transition ${
                            user.status === "INACTIVE" ? "text-gray-500" : "text-gray-200 group-hover:text-orange-300"
                          }`}>
                          {user.description}
                        </p>
                        <div className="mt-4 text-xs text-gray-500">
                          ID: #{user.user_id}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className={`text-xs px-3 py-1 rounded-full border ${
                          user.status === "ACTIVE" 
                            ? "bg-orange-500/20 text-orange-400 border-orange-500/30" 
                            : "bg-gray-500/20 text-gray-400 border-white/10"
                        }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center py-20 text-gray-400">Forge is empty.</p>
        )}
      </div>
    </div>
  );
}