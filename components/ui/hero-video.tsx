"use client";

export function HeroVideo() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80"
      >
        <source
          src="https://player.vimeo.com/external/517090081.hd.mp4?s=88cdcc5d5c9e56439d8b7ff73c53a5c0ce212fda&profile_id=175&oauth2_token_id=57447761"
          type="video/mp4"
        />
        {/* Fallback image for browsers that don't support video */}
        <img
          src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80"
          alt="Hydroponic farming"
          className="w-full h-full object-cover"
        />
      </video>
    </div>
  );
}