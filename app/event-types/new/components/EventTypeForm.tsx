"use client";

import { useState } from "react";
import { createEventType } from "@/app/actions";

export default function EventTypeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true);
    // Allow user to type freely but maybe sanitize on blur or just let them type? 
    // Usually best to just let them type but maybe prevent spaces.
    // Let's just update state here and sanitize on submit/blur, or strictly enforce.
    // Strict enforcement is better for "slugs".
    setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    // Use the state slug to ensure it matches what users sees if we did controlled input
    // But since the input below uses value={slug}, formData.get("slug") should be correct.
    // Just in case, let's explicitly use the sanitized version.
    const finalSlug = generateSlug(slug);
    const duration = parseInt(formData.get("duration") as string, 10);
    const description = formData.get("description") as string;

    try {
      const result = await createEventType({
        title,
        slug: finalSlug,
        duration,
        description: description || null,
      });

      // If we get here, redirect didn't happen (error case)
      setIsLoading(false);
      if (result && !result.success) {
        setError(result.error || "Failed to create event type. Please try again.");
      }
    } catch (err) {
      // Redirect throws, so we catch it here but don't show error
      // The redirect will happen automatically
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-900/20 border border-red-800 p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={handleTitleChange}
          className="w-full rounded-md border border-gray-700 bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="e.g., 15 Min Meeting"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="mb-2 block text-sm font-medium text-white"
        >
          Slug
        </label>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-800 text-gray-400 sm:text-sm">
            localhost:3000/upasana/
          </span>
          <input
            type="text"
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={handleSlugChange}
            className="flex-1 min-w-0 block w-full rounded-none rounded-r-md border border-gray-700 bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            placeholder="e.g., 15-min-meeting"
          />
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Used in the URL: localhost:3000/[username]/[slug]
        </p>
      </div>

      <div>
        <label
          htmlFor="duration"
          className="mb-2 block text-sm font-medium text-white"
        >
          Duration (minutes)
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          required
          min="1"
          className="w-full rounded-md border border-gray-700 bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="15"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full rounded-md border border-gray-700 bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="Optional description of the event type..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
