import React from "react";

export function Footer() {
  return (
    <footer className="mx-auto mb-10 px-4 text-sm lg:px-6 pointer-events-auto relative z-10">
      <div className="mb-6 h-[5px] w-full bg-current"></div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:gap-8">
        <div className="flex-1 text-[2.75rem] leading-[1] font-[900] tracking-tighter text-balance md:text-[6vw]">
          <p>Made to be worn.</p>
          <p className="red:text-red text-[#5A5A5A]">Or judged. Or both.</p>
        </div>
        <div>
          <p className="text-[45vw] leading-[1] font-[900] tracking-tighter md:text-[12.75vw]">
            ©26
          </p>
        </div>
      </div>
      <div className="mt-[8rem] mb-4 md:mt-[16rem]">
        <p className="max-w-[52ch] tracking-tight text-balance md:text-2xl">
          Created by the ++hellohello team, this store and signature
          collection celebrates our collective creativity and passion for
          apparel. Carefully designed.
        </p>
      </div>
      <hr className="mb-6 h-[2px] w-full bg-current" />
      <div className="grid grid-cols-16 gap-x-6 gap-y-20 font-bold md:gap-6">
        <div className="order-last col-span-16 md:order-first md:col-span-4">
          <div className="flex flex-col">
            <a
              href="https://www.hellohello.is"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="font-bold text-xl uppercase tracking-widest">++HELLOHELLO</span>
            </a>
            <span>All rights reserved © 2026</span>
          </div>
        </div>
        <div className="col-span-8 md:col-span-3">
          Libertad 2529 <br /> Office 102 <br /> Montevideo, Uruguay
        </div>
        <div className="col-span-8 md:col-span-4">
          <a
            href="https://www.hellohello.is/privacy-policy"
            target="_blank"
            rel="noreferrer noopener"
            className="link-hover max-w-fit hover:text-red transition-colors"
          >
            Privacy Policy
          </a>
        </div>
        <div className="order-first col-span-16 flex justify-evenly md:order-last md:col-span-5">
          <div className="flex flex-1 flex-col gap-3">
            <a
              href="https://dribbble.com/hellohelloteam"
              target="_blank"
              rel="noreferrer noopener"
              className="link-hover max-w-fit hover:text-red transition-colors"
            >
              Dribbble
            </a>
            <a
              href="https://www.instagram.com/hellohelloteam"
              target="_blank"
              rel="noreferrer noopener"
              className="link-hover max-w-fit hover:text-red transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/hellohello"
              target="_blank"
              rel="noreferrer noopener"
              className="link-hover max-w-fit hover:text-red transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/hellohelloteam"
              target="_blank"
              rel="noreferrer noopener"
              className="link-hover max-w-fit hover:text-red transition-colors"
            >
              Twitter (X)
            </a>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <a
              href="https://www.hellohello.is/work"
              className="link-hover max-w-fit hover:text-red transition-colors"
              target="_blank"
              rel="noreferrer noopener"
            >
              Work
            </a>
            <a
              href="https://www.hellohello.is/services"
              className="link-hover max-w-fit hover:text-red transition-colors"
              target="_blank"
              rel="noreferrer noopener"
            >
              Services
            </a>
            <a
              href="https://www.hellohello.is/about"
              className="link-hover max-w-fit hover:text-red transition-colors"
              target="_blank"
              rel="noreferrer noopener"
            >
              About
            </a>
            <a
              href="https://www.hellohello.is/careers"
              className="link-hover max-w-fit hover:text-red transition-colors"
              target="_blank"
              rel="noreferrer noopener"
            >
              Careers
            </a>
          </div>
          <div className="flex-1">
            <a
              href="https://www.hellohello.is/contact"
              className="link-hover max-w-fit hover:text-red transition-colors"
              target="_blank"
              rel="noreferrer noopener"
            >
              Let&#x27;s talk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
