```vue
<template>
  <footer class="public-footer">

    <!-- ================= MAIN FOOTER ================= -->
    <div class="footer-main">

      <div class="container">

        <div class="row g-5">

          <!-- ================= COMPANY INFO ================= -->
          <div class="col-lg-4 col-md-6">

            <div class="footer-brand">

              <h3 class="brand-name">
                RBME <span>Engineers</span>
              </h3>

              <p class="brand-quote">
                Engineering excellence through reliable products,
                innovative solutions, and a commitment to quality.
              </p>

            </div>


            <!-- Social Media -->
            <div class="social-links">

              <a
                href="#"
                class="social-link"
                aria-label="Facebook"
              >
                <i class="bi bi-facebook"></i>
              </a>

              <a
                href="#"
                class="social-link"
                aria-label="Instagram"
              >
                <i class="bi bi-instagram"></i>
              </a>

              <a
                href="#"
                class="social-link"
                aria-label="LinkedIn"
              >
                <i class="bi bi-linkedin"></i>
              </a>

              <a
                href="#"
                class="social-link"
                aria-label="YouTube"
              >
                <i class="bi bi-youtube"></i>
              </a>

              <a
                href="https://wa.me/919461220842"
                class="social-link"
                aria-label="WhatsApp"
              >
                <i class="bi bi-whatsapp"></i>
              </a>

            </div>

          </div>


          <!-- ================= COMPANY LIST ================= -->
          <div class="col-lg-3 col-md-6">

            <h5 class="footer-title">
              Our Companies
            </h5>

            <ul class="footer-links company-list">

              <li
                v-for="company in companies"
                :key="company.id"
              >
                <router-link
                  :to="`/companies/${company.id}`"
                >
                  <i class="bi bi-chevron-right"></i>
                  {{ company.name }}
                </router-link>
              </li>

            </ul>

          </div>


          <!-- ================= QUICK LINKS ================= -->
          <div class="col-lg-2 col-md-6">

            <h5 class="footer-title">
              Quick Links
            </h5>

            <ul class="footer-links">

              <li>
                <router-link to="/">
                  <i class="bi bi-chevron-right"></i>
                  Home
                </router-link>
              </li>
              
              <li>
                <router-link to="/companies/1">
                  <i class="bi bi-chevron-right"></i>
                  Products
                </router-link>
              </li>

              <li>
                <router-link to="/about">
                  <i class="bi bi-chevron-right"></i>
                  About Us
                </router-link>
              </li>

              <li>
                <router-link to="/contact">
                  <i class="bi bi-chevron-right"></i>
                  Contact
                </router-link>
              </li>

            </ul>

          </div>


          <!-- ================= CONTACT ================= -->
          <div class="col-lg-3 col-md-6">

            <h5 class="footer-title">
              Contact Us
            </h5>

            <ul class="contact-list">

              <li>
                <span class="contact-icon">
                  <i class="bi bi-geo-alt"></i>
                </span>

                <span>
                  Kolkata, West Bengal, India
                </span>
              </li>

              <li>
                <span class="contact-icon">
                  <i class="bi bi-telephone"></i>
                </span>

                <a href="tel:+919017137794">
                  +919017137794
                </a>
                  <br>
                <a href="tel:+919461220842">
                  +919461220842
                </a>
              </li>

              <li>
                <span class="contact-icon">
                  <i class="bi bi-envelope"></i>
                </span>

                <a href="mailto:info.rambakerymachinesengineer@gmail.com">
                  info.rambakerymachinesengineer@gmail.com
                </a>
              </li>

              <li>
                <span class="contact-icon">
                  <i class="bi bi-clock"></i>
                </span>

                <span>
                  Mon – Sat : 10:00 AM – 6:30 PM
                </span>
              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>


    <!-- ================= FOOTER BOTTOM ================= -->
    <div class="footer-bottom">

      <div class="container">

        <div class="row align-items-center">

          <div class="col-md-6">

            <p class="copyright">
              © {{ currentYear }}
              <strong>RBME Engineers</strong>.
              All Rights Reserved.
            </p>

          </div>

          <div class="col-md-6">

            <div class="footer-bottom-links">

              <router-link to="/about">
                Privacy Policy
              </router-link>

              <span>|</span>

              <router-link to="/contact">
                Terms & Conditions
              </router-link>

            </div>

          </div>

        </div>

      </div>

    </div>

  </footer>
</template>


<script setup>

const currentYear = new Date().getFullYear();


// ---------------------------------------
// Static companies for now
// ---------------------------------------

const companies = [
  {
    id: 1,
    name: "Ram Bakery Machines & Enginners"
  },
  
];

</script>


<style scoped>

/* ========================================
   FOOTER
======================================== */

.public-footer {
  color: #d5d9df;
}


/* ========================================
   MAIN
======================================== */

.footer-main {
  padding: 75px 0 65px;
  background: #101820;
}


/* ========================================
   BRAND
======================================== */

.brand-name {
  margin-bottom: 18px;
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.brand-name span {
  font-weight: 400;
}

.brand-quote {
  max-width: 390px;
  margin-bottom: 25px;
  color: #9da7b3;
  font-size: 0.95rem;
  line-height: 1.8;
}


/* ========================================
   SOCIAL
======================================== */

.social-links {
  display: flex;
  gap: 10px;
}

.social-link {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #35404b;
  border-radius: 50%;

  color: #ffffff;
  text-decoration: none;

  transition: all 0.25s ease;
}

.social-link:hover {
  transform: translateY(-3px);
  background: #0d6efd;
  border-color: #0d6efd;
  color: #ffffff;
}


/* ========================================
   FOOTER TITLES
======================================== */

.footer-title {
  position: relative;

  margin-bottom: 25px;
  padding-bottom: 12px;

  color: #ffffff;

  font-size: 1.05rem;
  font-weight: 700;
}

.footer-title::after {
  content: "";

  position: absolute;
  left: 0;
  bottom: 0;

  width: 35px;
  height: 2px;

  background: #0d6efd;
}


/* ========================================
   LINKS
======================================== */

.footer-links {
  margin: 0;
  padding: 0;

  list-style: none;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  display: inline-flex;
  align-items: center;

  color: #9da7b3;
  text-decoration: none;

  font-size: 0.9rem;

  transition: all 0.2s ease;
}

.footer-links a:hover {
  color: #ffffff;
  transform: translateX(4px);
}

.footer-links i {
  margin-right: 7px;
  font-size: 0.65rem;
  color: #0d6efd;
}


/* ========================================
   COMPANY LIST
======================================== */

.company-list a {
  line-height: 1.5;
}


/* ========================================
   CONTACT
======================================== */

.contact-list {
  margin: 0;
  padding: 0;

  list-style: none;
}

.contact-list li {
  display: flex;
  align-items: flex-start;

  gap: 12px;

  margin-bottom: 18px;

  color: #9da7b3;
  font-size: 0.9rem;
  line-height: 1.6;
}

.contact-icon {
  min-width: 22px;

  color: #0d6efd;
  font-size: 1rem;
}

.contact-list a {
  color: #9da7b3;
  text-decoration: none;

  transition: 0.2s ease;
}

.contact-list a:hover {
  color: #ffffff;
}


/* ========================================
   BOTTOM
======================================== */

.footer-bottom {
  padding: 20px 0;

  background: #0b1117;

  border-top: 1px solid #26303a;
}

.copyright {
  margin: 0;

  color: #7f8994;
  font-size: 0.85rem;
}

.copyright strong {
  color: #c9d0d7;
}


.footer-bottom-links {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  gap: 12px;
}

.footer-bottom-links a {
  color: #7f8994;

  font-size: 0.85rem;
  text-decoration: none;

  transition: 0.2s ease;
}

.footer-bottom-links a:hover {
  color: #ffffff;
}

.footer-bottom-links span {
  color: #39434d;
}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 767px) {

  .footer-main {
    padding: 55px 0 45px;
  }

  .footer-bottom {
    text-align: center;
  }

  .footer-bottom-links {
    justify-content: center;
    margin-top: 12px;
  }

}

</style>
```
