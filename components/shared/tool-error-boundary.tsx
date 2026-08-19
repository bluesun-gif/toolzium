"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ToolErrorBoundary extends React.Component<
  { children: React.ReactNode; toolName?: string },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; toolName?: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ToolErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] p-8 text-center space-y-6">
          <div className="h-16 w-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <div className="space-y-2 max-w-md">
            <h2 className="text-xl font-bold text-foreground">
              Something went wrong
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {this.props.toolName
                ? `The ${this.props.toolName} tool ran into an unexpected error.`
                : "This tool ran into an unexpected error."}{" "}
              Try refreshing the page — your data is not lost.
            </p>
            {this.state.error && (
              <p className="text-xs font-mono text-muted-foreground/60 bg-muted px-3 py-2 rounded-lg">
                {this.state.error.message}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
