'use client'
import React, { useState, useRef, useEffect } from "react";
import { CircleDot, Mail, ArrowRight, RefreshCw } from "lucide-react";
import { useEmailVerificationStore } from "@/zustand/emailVerificationStore";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/loading";
import sleep from "@/utils/sleep";

function App() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [isResendingCode, setResendingCode] = useState(false)

  const [isSuccess, setIsSuccess] = useState<boolean | null>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { email, resetEmailForVerification } = useEmailVerificationStore();

  const router = useRouter()

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setError(null);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...verificationCode];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setVerificationCode(newCode);

    // Focus last filled input or first empty input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  useEffect(() => {

  }, [errorMessage, successMessage])

  const sendVerificationCode = async (email: string) => {
    try {

      // get the email from localstorage - zustand store
      if (email) {
        // if email exists - POST generated code and email to verification table

        const response = await fetch("/api/auth/generate-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email
          }),
        });

        // After generating passcode
        console.log(response);
        return response
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true)

    let code = verificationCode.join('')

    const response = await fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code
      })
    })

    const data = await response.json()

    if(response.status == 200){
      setIsLoading(false)
      setIsSuccess(true)
      await sleep(1000)
      setSuccessMessage(data.message)

      // reset store to remove email
      resetEmailForVerification()

      router.push('/auth/login')
      setIsSuccess(false)
    }

    if(response.status == 400 || response.status == 500){
      setErrorMessage(data.message)
      setIsLoading(false)
    }    
  };

  const handleResendCode = async () => {
    if (!canResend && timeLeft > 0) return;
    
    // setIsLoading(true);
    setResendingCode(true)

    try {
    // call verification code func
    const emailVerificationResponse = await sendVerificationCode(email)

    const data = await emailVerificationResponse?.json()

    if(emailVerificationResponse?.status == 200){
      setSuccessMessage(data.message)
    }


      setTimeLeft(180); // Reset timer to 10 minutes
      setCanResend(false);
    } finally {
      setResendingCode(false);
    }
  };

  if (isLoading) {
      return (
        <div className="flex justify-center items-center screen-h mt-40">
          <Loading text="Verifying email 😎🤩..." />
        </div>
      );
    }

    if (isResendingCode) {
      return (
        <div className="flex justify-center items-center screen-h mt-40">
          <Loading text="Resending verification code 😎..." />
        </div>
      );
    }


    if (isSuccess) {
      return (
        <div className="flex justify-center items-center screen-h mt-40">
          <Loading text="Success, redirecting to login 🤩🤝..." />
        </div>
      );
    }

    

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-50 items-center justify-center p-12">
        <div className="max-w-lg">
          <div className="relative w-full max-w-[300px] aspect-square mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-4/5 h-4/5">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                <div
                  className="absolute inset-4 bg-green-200 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="absolute inset-8 bg-green-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mail className="w-12 h-12 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Verify Your Email
            </h2>
            <p className="mt-2 text-gray-600">
              We've sent a verification code to your email address. Please enter
              it below to complete your registration.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Verification Form */}
      <div className="flex-1 p-6 lg:p-12 bg-white">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Enter Verification Code
            </h1>
            <p className="text-gray-600">
              Please check your email <span className="text-green-500">{email}</span> for a 6-digit verification code.
            </p>

            {errorMessage && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 mt-5">
                <p>{errorMessage}</p>
              </div>
            )}
            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 mt-5">
                <p>{successMessage}</p>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {/* Verification Code Input */}
            <div>
              <div className="flex justify-between gap-2">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    // ref={el => inputRefs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-2xl font-semibold border-2 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all"
                  />
                ))}
              </div>
              {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={isLoading || verificationCode.some((digit) => !digit)}
              className={`w-full py-4 px-6 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 ${
                isLoading || verificationCode.some((digit) => !digit)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Verify Email
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Resend Code */}
            <div className="text-center">
              <button
                onClick={handleResendCode}
                disabled={isLoading || (!canResend && timeLeft > 0)}
                className={`font-medium transition-colors ${
                  canResend || timeLeft === 0
                    ? "text-green-600 hover:text-green-700"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Resend verification code
                {!canResend && timeLeft > 0 && ` in ${formatTime(timeLeft)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;