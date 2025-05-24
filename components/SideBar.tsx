"use client";
import React, { useState } from "react";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";

export default function SideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <button
        className="m-4 p-1 h-8 w-9 cursor-pointer border-2 rounded border-teal-500 bg-teal-50 dark:bg-teal-900 dark:border-teal-600"
        onClick={() => setShowSideBar(true)}
        aria-label="Open Sidebar"
        aria-expanded={showSideBar}
      >
        <svg
          fill="var(--color-teal-500)"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <g>
            <rect y="1" width="16" height="2" />
            <rect y="6" width="16" height="2" />
            <rect y="11" width="16" height="2" />
          </g>
        </svg>
      </button>

      <button
        className={`fixed inset-0 w-screen h-screen origin-top-left transition-transform duration-300 ease-in-out z-50 ${
          showSideBar ? "scale-100" : "scale-0"
        }`}
        aria-label="Close Sidebar Overlay"
        aria-hidden={!showSideBar}
        onClick={() => setShowSideBar(false)}
        role="button"
      />

      <aside
        className={`fixed top-0 left-0 w-100 min-h-dvh dark:bg-teal-950 bg-teal-200 p-4 origin-top-left transition-transform duration-300 ease-in-out z-50 ${
          showSideBar ? "scale-100" : "scale-0"
        }`}
        aria-label="Sidebar"
        aria-hidden={!showSideBar}
        role="navigation"
      >
        <div className="flex items-center justify-between">
          <ThemeToggler />
          <button
            className="text-teal-500 text-5xl cursor-pointer block mx-1"
            onClick={() => setShowSideBar(false)}
            aria-hidden={!showSideBar}
            aria-label="Close Sidebar Button"
            role="button"
          >
            &times;
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/"
            className="text-xl font-bold text-teal-600 capitalize px-3 border-l-2 border-teal-600 underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/line-charts"
            className="text-xl font-bold text-teal-600 capitalize px-3 border-l-2 border-teal-600 underline underline-offset-4"
          >
            line charts
          </Link>
          <Link
            href="/bar-charts"
            className="text-xl font-bold text-teal-600 capitalize px-3 border-l-2 border-teal-600 underline underline-offset-4"
          >
            bar charts
          </Link>
          <Link
            href="/pie-charts"
            className="text-xl font-bold text-teal-600 capitalize px-3 border-l-2 border-teal-600 underline underline-offset-4"
          >
            pie charts
          </Link>
        </div>
      </aside>
    </>
  );
}
