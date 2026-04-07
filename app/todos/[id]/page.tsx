// app/[id]/page.tsx
import Link from "next/link";
import ToggleButton from "./ToggleButton"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export default async function TodoDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let userData: any = null;
  let error: string | null = null;

  try {
    const res = await fetch(`${API_URL}/users/${id}`, { cache: "no-store" });

    if (!res.ok) {
      error = res.status === 404 ? "Task not found in forge" : `Server error: ${res.status}`;
    } else {
      const responseData = await res.json();
      // Handle the data wrapper correctly
      // Depending on your Spring Boot controller, it might be in an array or a direct object
      userData = Array.isArray(responseData.data?.user_details) 
                 ? responseData.data.user_details[0] 
                 : responseData.data;
    }
  } catch (err) {
    error = "Failed to communicate with the Forge API.";
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">⚒️</div>
          <h1 className="text-3xl font-bold text-red-400">{error || "Record Not Found"}</h1>
          <Link href="/" className="mt-8 inline-block px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black py-16 text-white">
      <div className="max-w-3xl mx-auto px-6">
        
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-10 group">
          <span>←</span> Back to Status Board
        </Link>

        <div className="p-[1px] rounded-3xl bg-gradient-to-br from-orange-500/30 to-amber-500/20 shadow-2xl">
          <div className="bg-[#0b1120]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            
            <div className="px-12 pt-12 pb-10">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl text-3xl shadow-inner ${
                    userData.status === "ACTIVE" ? "bg-orange-500/20 text-orange-400" : "bg-gray-800 text-gray-500"
                  }`}>
                  {userData.status === "ACTIVE" ? "🔥" : "🌑"}
                </div>

                <div className="flex-1">
                  <div className="text-xs font-bold text-orange-500/70 tracking-[0.2em] uppercase">
                    Ref ID: {userData.user_id}
                  </div>
                  <h1 className="text-3xl font-bold mt-1 text-gray-100 tracking-tight">
                    {userData.description}
                  </h1>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] px-12 py-8 border-y border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">Forge Status</p>
                <p className={`text-xl font-bold mt-1 ${userData.status === "ACTIVE" ? "text-orange-400" : "text-gray-400"}`}>
                  {userData.status}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-gray-500">Priority</p>
                <p className="text-xl font-bold mt-1 text-gray-200 underline decoration-orange-500/50">Standard</p>
              </div>
            </div>

            <div className="px-12 py-10 bg-white/[0.01]">
               <p className="text-gray-400 leading-relaxed italic">
                 "{userData.description}"
               </p>
            </div>

            <div className="bg-black/20 px-12 py-8 border-t border-white/10 flex gap-4">
              <Link href="/" className="flex-1 text-center bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 py-4 rounded-2xl font-medium transition">
                Exit to Board
              </Link>
              <ToggleButton todo={userData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}