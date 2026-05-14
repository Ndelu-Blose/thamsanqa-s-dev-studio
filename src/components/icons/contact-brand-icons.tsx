import type { SVGProps } from "react";

const svgBase = "shrink-0 block";

/** GitHub mark — use with `className="w-7 h-7 text-[#181717]"` on light tiles. */
export function BrandGithubMark({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={`${svgBase} ${className ?? ""}`}
      viewBox="0 0 98 96"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.21-22.229-5.376-22.229-24.27 0-5.42 1.94-9.378 5.011-12.504-.501-1.212-2.191-6.918.478-14.291 0 0 4.301-1.368 14.1 5.052a47.154 47.154 0 0 1 12.504-1.68c4.168 0 8.397.579 12.51 1.68 9.689-6.42 13.988-5.052 13.988-5.052 2.67 7.373.98 13.079.49 14.291 3.128 3.126 5.012 7.084 5.012 12.504 0 18.958-11.483 23.098-22.334 24.427 1.912 1.63 3.427 4.902 3.427 9.871 0 7.132-.08 12.879-.08 14.573 0 1.31.89 2.91 3.434 2.31 19.285-6.522 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      />
    </svg>
  );
}

/** LinkedIn mark — use with `className="w-7 h-7 text-white"` on `#0A66C2` tiles, or `text-[#0A66C2]` on transparent. */
export function BrandLinkedInMark({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={`${svgBase} ${className ?? ""}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

/** Filled envelope — use with `className="w-7 h-7 text-white"` on coloured mail tiles. */
export function BrandMailMark({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={`${svgBase} ${className ?? ""}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  );
}
