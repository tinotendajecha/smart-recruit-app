"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, X } from "lucide-react";

interface ResumeViewerProps {
  resumeUrl: string;
}

export default function ResumeViewer({ resumeUrl }: ResumeViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Resume</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[80vh] p-0">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold">Resume Preview</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={resumeUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="h-full bg-gray-100">
              <iframe
                src={resumeUrl}
                className="w-full h-full"
                title="Resume Preview"
              />
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="mt-4">
          <Button variant="outline" className="w-full" asChild>
            <a href={resumeUrl} download>
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}