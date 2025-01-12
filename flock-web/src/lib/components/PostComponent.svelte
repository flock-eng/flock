<script lang="ts">
    import type { Post } from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';
  
    export let post: Post;
  
    function formatDate(timestamp: bigint): string {
      return new Date(Number(timestamp)).toLocaleString();
    }
  
    function getInitial(name: string | undefined | null): string {
      return (name || '').charAt(0).toUpperCase() || '?';
    }
  
    $: profileColor = post.author?.profilePicture?.pictureType?.case === 'hexColor'
      ? post.author.profilePicture.pictureType.value
      : '#CBD5E1';
  </script>
  
  <div class="border rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow">
    <div class="flex items-center gap-3 mb-2">
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-semibold"
        style:background-color={profileColor}
      >
        {getInitial(post.author?.firstName) || getInitial(post.author?.username)}
      </div>
      <div>
        <div class="font-semibold">
          {#if post.author?.firstName || post.author?.lastName}
            {post.author.firstName} {post.author.lastName}
          {/if}
          <span class="text-gray-500 font-normal">@{post.author?.username || 'unknown'}</span>
        </div>
        <div class="text-sm text-gray-500">{formatDate(post.createdAt)}</div>
      </div>
    </div>
    <p class="text-gray-800 whitespace-pre-wrap">{post.content}</p>
  </div>
  