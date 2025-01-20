import { JSX } from "preact";

function CreatePost(): JSX.Element {
  return (
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-shadow animate-slide-in">
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full shadow-md flex items-center justify-center text-white text-lg font-semibold">
          JD
        </div>
        <button class="flex-1 text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100">
          <span class="text-sm">What's on your mind?</span>
        </button>
      </div>
      <div class="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
        <button class="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-500 px-4 py-2 rounded-lg transition-colors group">
          <div class="p-1.5 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-sm font-medium">Photo</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-500 px-4 py-2 rounded-lg transition-colors group">
          <div class="p-1.5 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-sm font-medium">Video</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-500 px-4 py-2 rounded-lg transition-colors group">
          <div class="p-1.5 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-sm font-medium">Event</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-500 px-4 py-2 rounded-lg transition-colors group">
          <div class="p-1.5 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <span class="text-sm font-medium">Article</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-500 px-4 py-2 rounded-lg transition-colors group ml-auto">
          <div class="p-1.5 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <span class="text-sm font-medium">More</span>
        </button>
      </div>
    </div>
  );
}

export default function MainFeed(): JSX.Element {
  return (
    <div class="flex-1 max-w-2xl mx-auto pt-4">
      <CreatePost />
      
      <div class="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow animate-slide-in">
            <div class="flex items-center space-x-3 mb-4">
              <a href="/profile/user1" class="group">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full shadow-md flex items-center justify-center text-white text-lg font-semibold group-hover:shadow-lg transition-shadow">
                  JD
                </div>
              </a>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <a href="/profile/user1" class="font-medium text-gray-800 hover:text-blue-500 transition-colors">John Doe</a>
                    <p class="text-sm text-gray-500 flex items-center">
                      <span>Software Engineer at Tech Corp</span>
                      <span class="mx-1">·</span>
                      <span>2h ago</span>
                    </p>
                  </div>
                  <button class="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <p class="text-gray-800 text-sm leading-relaxed">
                Just wrapped up an exciting project using the latest web technologies! 🚀 The combination of modern frameworks and best practices made it a breeze. Looking forward to sharing more insights about the development process. #WebDev #Innovation
              </p>
              <div class="rounded-xl overflow-hidden border border-gray-100">
                <img 
                  src={`https://picsum.photos/seed/${i}/800/400`}
                  alt="Post image"
                  class="w-full h-64 object-cover hover:opacity-95 transition-opacity"
                  loading="lazy"
                />
              </div>
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div class="flex items-center space-x-4">
                  <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group">
                    <div class="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                      </svg>
                    </div>
                    <span class="text-sm font-medium">123</span>
                  </button>
                  <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group">
                    <div class="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                    <span class="text-sm font-medium">45</span>
                  </button>
                  <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group">
                    <div class="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                      </svg>
                    </div>
                    <span class="text-sm font-medium">12</span>
                  </button>
                </div>
                <button class="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                </button>
              </div>
              <div class="pt-4">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    JD
                  </div>
                  <div class="flex-1">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 