"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import Link from "next/link";
import Image from 'next/image';

const MasterLayout = ({ children }) => {
  let pathname = usePathname();
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = usePathname(); // Hook to get the current route

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location ||
            link.getAttribute("to") === location
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      console.log(res);
      setProducts(json?.data || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type='button'
          className='sidebar-close-btn'
        >
          <Icon icon='radix-icons:cross-2' />
        </button>
        <div>
          <Link href='/' className='sidebar-logo'>
            <img
              src='https://cdn.gws365.in//images/gws365/logo.png'
              alt='site logo'
              className='light-logo'
            />
            <img
              src='https://cdn.gws365.in//images/gws365/logo.png'
              alt='site logo'
              className='dark-logo'
            />
            <img
              src='https://cdn.gws365.in//images/gws365/logo.png'
              alt='site logo'
              className='logo-icon'
            />
          </Link>
        </div>
        <div className='sidebar-menu-area'>
          <ul className='sidebar-menu' id='sidebar-menu'>
  <li>
              <Link
                href='/'
                className={pathname === "/" ? "active-page" : ""}
              >
                <Icon
                  icon='solar:home-smile-angle-outline'
                  className='menu-icon'
                />
                <span>Dashboard</span>
              </Link>
            </li>
              <li>
              <Link
                href='/projects'
                className={pathname === "/projects" ? "active-page" : ""}
              >
                <Icon
                  icon='solar:home-smile-angle-outline'
                  className='menu-icon'
                />
                <span>Projects</span>
              </Link>
            </li>

  {/* Basic Features Section */}
  <li className='sidebar-menu-group-title'>Basic Features</li>

  <li>
    <Link href='/leads' className={pathname === "/leads" ? "active-page" : ""}>
      <Icon icon='tabler:users' className='menu-icon' />
      <span>Leads</span>
    </Link>
  </li>

  <li>
    <Link href='/contacts' className={pathname === "/contacts" ? "active-page" : ""}>
      <Icon icon='ph:address-book' className='menu-icon' />
      <span>Contacts</span>
    </Link>
  </li>

  <li>
    <Link href='/opportunities' className={pathname === "/opportunities" ? "active-page" : ""}>
      <Icon icon='carbon:chart-line' className='menu-icon' />
      <span>Opportunities</span>
    </Link>
  </li>

  <li>
    <Link href='/tasks' className={pathname === "/tasks" ? "active-page" : ""}>
      <Icon icon='mdi:calendar-check' className='menu-icon' />
      <span>Tasks & Calendar</span>
    </Link>
  </li>

  <li>
    <Link href='/activities' className={pathname === "/activities" ? "active-page" : ""}>
      <Icon icon='fluent:task-list-square-ltr-24-regular' className='menu-icon' />
      <span>Activity Timeline</span>
    </Link>
  </li>

  <li>
    <Link href='/settings' className={pathname === "/settings" ? "active-page" : ""}>
      <Icon icon='mdi:cog-outline' className='menu-icon' />
      <span>CRM Settings</span>
    </Link>
  </li>

  {/* Add-On Features (Coming Soon) */}
  <li className='sidebar-menu-group-title'>Add-On Features (Coming Soon)</li>

  <li>
    <Link href='/sales-automation' className={pathname === "/sales-automation" ? "active-page" : ""}>
      <Icon icon='mdi:robot-outline' className='menu-icon' />
      <span>Sales Workflow</span>
    </Link>
  </li>

  <li>
    <Link href='/campaigns' className={pathname === "/campaigns" ? "active-page" : ""}>
      <Icon icon='material-symbols:campaign-outline' className='menu-icon' />
      <span>Campaigns</span>
    </Link>
  </li>

  <li>
    <Link href='/invoices' className={pathname === "/invoices" ? "active-page" : ""}>
      <Icon icon='fa6-regular:file-invoice' className='menu-icon' />
      <span>Quotations / Invoices</span>
    </Link>
  </li>

  <li>
    <Link href='/analytics' className={pathname === "/analytics" ? "active-page" : ""}>
      <Icon icon='ic:round-analytics' className='menu-icon' />
      <span>Analytics & Reports</span>
    </Link>
  </li>

  <li>
    <Link href='/support' className={pathname === "/support" ? "active-page" : ""}>
      <Icon icon='mdi:headset' className='menu-icon' />
      <span>Customer Support</span>
    </Link>
  </li>

  <li>
    <Link href='/documents' className={pathname === "/documents" ? "active-page" : ""}>
      <Icon icon='carbon:document' className='menu-icon' />
      <span>Documents</span>
    </Link>
  </li>

  <li>
    <Link href='/products' className={pathname === "/products" ? "active-page" : ""}>
      <Icon icon='material-symbols:inventory-2-outline' className='menu-icon' />
      <span>Products / Services</span>
    </Link>
  </li>

  <li>
    <Link href='/integrations' className={pathname === "/integrations" ? "active-page" : ""}>
      <Icon icon='lucide:plug' className='menu-icon' />
      <span>Integrations</span>
    </Link>
  </li>

  <li>
    <Link href='/roles' className={pathname === "/roles" ? "active-page" : ""}>
      <Icon icon='fluent:people-team-20-regular' className='menu-icon' />
      <span>User Roles</span>
    </Link>
  </li>

  <li>
    <Link href='/activity-log' className={pathname === "/activity-log" ? "active-page" : ""}>
      <Icon icon='mdi:clipboard-list-outline' className='menu-icon' />
      <span>Activity Log</span>
    </Link>
  </li>
</ul>

        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className='navbar-header'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-4'>
                <button
                  type='button'
                  className='sidebar-toggle'
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon='iconoir:arrow-right'
                      className='icon text-2xl non-active'
                    />
                  ) : (
                    <Icon
                      icon='heroicons:bars-3-solid'
                      className='icon text-2xl non-active '
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type='button'
                  className='sidebar-mobile-toggle'
                >
                  <Icon icon='heroicons:bars-3-solid' className='icon' />
                </button>
                <form className='navbar-search'>
                  <input type='text' name='search' placeholder='Search' />
                  <Icon icon='ion:search-outline' className='icon' />
                </form>
              </div>
            </div>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-3'>
                {/* ThemeToggleButton */}
                <ThemeToggleButton />
                <div className='dropdown d-none d-sm-inline-block'>
                  <button
                    className='has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <img
                      src='assets/images/lang-flag.png'
                      alt='Wowdash'
                      className='w-24 h-24 object-fit-cover rounded-circle'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-sm'>
                    <div className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-0'>
                          Choose Your Language
                        </h6>
                      </div>
                    </div>
                    <div className='max-h-400-px overflow-y-auto scroll-sm pe-8'>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='english'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag1.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              English
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='english'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='japan'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag2.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              Japan
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='japan'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='france'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag3.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              France
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='france'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='germany'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag4.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              Germany
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='germany'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='korea'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag5.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              South Korea
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='korea'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='bangladesh'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag6.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              Bangladesh
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='bangladesh'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='india'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag7.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              India
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='india'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='canada'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag8.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              Canada
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='canada'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dropdown d-none d-sm-inline-block">
      <button
        className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
        type="button"
        data-bs-toggle="dropdown"
      >
        <img
          src='/assets/images/lang-flag.png'
          alt='Product Icon'
          className='object-fit-cover rounded-circle'
        />
      </button>

      <div className="dropdown-menu to-top dropdown-menu-sm">
        <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
          <div>
            <h6 className="text-lg text-primary-light fw-semibold mb-0">Product</h6>
          </div>
          <span className="badge bg-primary text-white px-2">
            {String(products.length).padStart(2, '0')}
          </span>
        </div>

        <div className="max-h-400-px overflow-y-auto scroll-sm pe-8">
          {products.map((product, index) => (
            <div
              className="form-check style-check d-flex align-items-center justify-content-between mb-16"
              key={product.id || index}
            >
              <label
                className="form-check-label line-height-1 fw-medium text-secondary-light"
                htmlFor={`product-${index}`}
              >
                <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                  <Image
                    src={product.image || '/assets/images/flags/flag1.png'}
                    alt={product.name}
                    width={36}
                    height={36}
                    className="bg-success-subtle text-success-main rounded-circle flex-shrink-0"
                  />
                  <span className="text-md fw-semibold mb-0">
                    {product.name}
                  </span>
                </span>
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="product"
                id={`product-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
                </div>
                {/* Notification dropdown end */}
                <div className='dropdown'>
                  <button
                    className='d-flex justify-content-center align-items-center rounded-circle'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <img
                      src='assets/images/user.png'
                      alt='image_user'
                      className='w-40-px h-40-px object-fit-cover rounded-circle'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-sm'>
                    <div className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-2'>
                          Shaidul Islam
                        </h6>
                        <span className='text-secondary-light fw-medium text-sm'>
                          Admin
                        </span>
                      </div>
                      <button type='button' className='hover-text-danger'>
                        <Icon
                          icon='radix-icons:cross-1'
                          className='icon text-xl'
                        />
                      </button>
                    </div>
                    <ul className='to-top-list'>
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                          href='/view-profile'
                        >
                          <Icon
                            icon='solar:user-linear'
                            className='icon text-xl'
                          />{" "}
                          My Profile
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}

                
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className='dashboard-main-body'>{children}</div>

        {/* Footer section */}
        <footer className='d-footer'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <p className='mb-0'>© 2025 GWS365. All Rights Reserved.</p>
            </div>
            <div className='col-auto'>
              <p className='mb-0'>
                Made by <span className='text-primary-600'>Genex Web Services</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
