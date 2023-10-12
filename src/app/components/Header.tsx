"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link"


const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#" },
  { name: "Gallery", href: "#" },
  { name: "Distributors", href: "#" },
  { name: "Let's Connect", href: "/test" },
];

const logos = {
  dark: "https://res.cloudinary.com/dhavkybgu/image/upload/v1697071900/az1vcxduttggfu3rhzyl.svg",
  light: "https://res.cloudinary.com/dhavkybgu/image/upload/v1697006905/tjyaeqa3kwdqgxdrekmk.svg",
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState("");

  useEffect(() => {
    let isMounted = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.scrollY <= 150) {
        setShow("");
      } else {
        setShow("bg-[#F7F6F3] text-black");
      }

      if (isMounted) {
        if (currentScrollY > lastScrollY) {
          // Scrolling up
          setIsScrollingUp(true);
        } else {
          // Not scrolling up
          setIsScrollingUp(false);
        }
        setLastScrollY(currentScrollY);
      }

    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 ${isScrollingUp && "down"} ${show}`}>
      <nav
        className=" flex items-center justify-between p-6 lg:px-8 max-w-7xl m-auto"
        aria-label="Global"
      >
        <div className="flex">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Zanda</span>
            <Image
              src={!show ? logos.light : logos.dark}
              alt="Zanda Logo"
              width={180}
              height={100}
              className="transition-all duration-300"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 "
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 ">
            Shop Now <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10  backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src={logos.light}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
