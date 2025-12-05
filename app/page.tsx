
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/custom/Header";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
              Now in Beta for Clinical Partners
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Automate clinical documents with an AI agent.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-balance">
              Instant, compliant, and clinician-friendly. Turn raw notes, PDFs, and EHR exports into structured clinical summaries and action plans in seconds.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/intake">
                  Speak with us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                View Demo
              </Button>
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24 bg-slate-50 dark:bg-slate-900/50 rounded-3xl my-8">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Zap className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Instant Extraction</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload any document and get structured data in seconds.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <ShieldCheck className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">HIPAA Compliant</h3>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade security and privacy by design.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Clinical Accuracy</h3>
                  <p className="text-sm text-muted-foreground">
                    Tuned for medical terminology and clinical workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by <span className="font-medium underline underline-offset-4">ModelML</span>. The source code is available on <span className="font-medium underline underline-offset-4">GitHub</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
