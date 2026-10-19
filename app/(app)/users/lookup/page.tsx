"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { users } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/LayoutUI";

export default function UsersLookupPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) { router.push("/login"); return; }
  }, [router]);

  async function doLookup(q: string) {
    if (!q || q.length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const res: any = await users.lookup(q);
      setResults(res.results || []);
    } catch (e: any) {
      setError(e.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-900">Find users</h2>
          <p className="text-sm text-muted">Search for people and businesses by username or name.</p>
        </div>
        <Link href="/dashboard" className="text-sm font-medium text-charcoal-500 hover:text-charcoal-700">
          ← Back to dashboard
        </Link>
      </div>

      <Card>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              autoComplete="off"
              placeholder="Search username or name…"
              className="w-full rounded-lg border border-border-strong px-4 py-3 pl-10 outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
              value={query}
              onChange={(e) => { setQuery(e.target.value); doLookup(e.target.value); }}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</div>
          </div>
          {loading && <p className="text-sm text-muted">Searching…</p>}
          {error && (
            <p className="rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger flex items-center gap-2">
              <span>⚠</span> {error}
            </p>
          )}
        </div>
      </Card>

      {query.length >= 2 && results.length === 0 && !loading && (
        <EmptyState
          title="No users found"
          description="Try searching with a different username or name."
          icon={<div className="text-2xl">🔍</div>}
        />
      )}

      {results.length > 0 && (
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-charcoal-900">Results ({results.length})</h3>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {results.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-3 px-3 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={u.display_name} username={u.username} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-charcoal-900 leading-tight">{u.display_name}</p>
                    <p className="text-xs text-slate-500">@{u.username} · {u.account_type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => router.push(`/send?to=${encodeURIComponent(u.username)}`)} className="px-3 py-1.5 text-sm">
                  Send
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
