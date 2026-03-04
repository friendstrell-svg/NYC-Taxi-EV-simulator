'use client'

import Link from 'next/link'
import { calculateModel } from '@/lib/model'
import { NYC_DEFAULTS } from '@/lib/data/presets'

export default function Home() {
  // Calculate outputs from NYC Defaults
  const outputs = calculateModel(NYC_DEFAULTS)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          NYC Taxi EV Simulator
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Interactive decision-support tool for modeling the total cost of ownership
          and carbon impact of electrifying New York City's yellow taxi fleet
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              NPV Savings (Fleet)
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${Math.abs(outputs.deltaNpv / 1_000_000).toFixed(0)}M
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Over {NYC_DEFAULTS.years} years with NYC defaults
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Payback Period
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {outputs.paybackYear !== null ? `${outputs.paybackYear} Years` : 'Never'}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              When EV investment breaks even
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-emerald-500">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              CO₂ Saved (Total)
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {(outputs.co2SavedTotal / 1_000_000).toFixed(1)}M Tonnes
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Environmental impact over {NYC_DEFAULTS.years} years
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 text-left max-w-3xl mx-auto">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong className="font-semibold">NYC Defaults:</strong> The model comes
                pre-configured with baseline assumptions for NYC yellow taxis including
                fleet size, utilization rates, and local grid intensity.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Run the Model
          </Link>

          <Link
            href="/methodology"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            View Methodology
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Interactive Dashboard
            </h3>
            <p className="text-gray-600">
              Real-time TCO analysis with adjustable parameters. See results update
              instantly as you modify assumptions.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Scenario Comparison
            </h3>
            <p className="text-gray-600">
              Compare optimistic, pessimistic, and baseline scenarios side-by-side
              to understand key trade-offs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Sensitivity Analysis
            </h3>
            <p className="text-gray-600">
              Identify the most impactful cost drivers with tornado charts showing
              parameter sensitivity.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Carbon Impact
            </h3>
            <p className="text-gray-600">
              Track CO₂ emissions savings over time accounting for local grid
              intensity and vehicle efficiency.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Transparent Methodology
            </h3>
            <p className="text-gray-600">
              Full documentation of assumptions, data sources, and modeling decisions
              with clear explanations.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Export Results
            </h3>
            <p className="text-gray-600">
              Download complete analysis results to CSV for further analysis or
              reporting in Excel.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}