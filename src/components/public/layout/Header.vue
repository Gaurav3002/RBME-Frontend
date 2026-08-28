```vue
<template>

  <header class="public-header">

    <div class="container">

      <div class="header-content">

        <!-- ================= LEFT ================= -->
        <div class="header-left">

          <!-- Phone -->
          <a
            href="tel:+919999999999"
            class="header-contact"
          >
            <i class="bi bi-telephone"></i>

            <span>
              +91 99999 99999
            </span>
          </a>


          <!-- Email -->
          <a
            href="mailto:info@rbmeengineers.com"
            class="header-contact"
          >
            <i class="bi bi-envelope"></i>

            <span>
              info@rbmeengineers.com
            </span>
          </a>

        </div>


        <!-- ================= RIGHT ================= -->
        <div class="header-right">

          <span class="header-tagline">
            Engineering • Automation • Industrial Solutions
          </span>


          <!-- Social -->
          <div class="header-social">

            <a
              href="#"
              aria-label="Facebook"
            >
              <i class="bi bi-facebook"></i>
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              <i class="bi bi-instagram"></i>
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
            >
              <i class="bi bi-linkedin"></i>
            </a>

            <a
              href="#"
              aria-label="YouTube"
            >
              <i class="bi bi-youtube"></i>
            </a>

          </div>

        </div>

      </div>

    </div>

  </header>

</template>


<style scoped>

/* =====================================================
   HEADER
===================================================== */

.public-header {

  background: #101820;

  color: #ffffff;

  font-size: 0.78rem;

}


/* =====================================================
   CONTAINER
===================================================== */

.header-content {

  min-height: 38px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

}


/* =====================================================
   LEFT
===================================================== */

.header-left {

  display: flex;

  align-items: center;

  gap: 25px;

}


.header-contact {

  display: inline-flex;

  align-items: center;

  gap: 7px;

  color: #b8c1ca;

  text-decoration: none;

  transition: 0.2s ease;

}


.header-contact i {

  color: #0d6efd;

}


.header-contact:hover {

  color: #ffffff;

}


/* =====================================================
   RIGHT
===================================================== */

.header-right {

  display: flex;

  align-items: center;

  gap: 20px;

}


.header-tagline {

  color: #8f9aa5;

  font-size: 0.7rem;

  letter-spacing: 0.4px;

}


/* =====================================================
   SOCIAL
===================================================== */

.header-social {

  display: flex;

  align-items: center;

  gap: 6px;

}


.header-social a {

  width: 25px;

  height: 25px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 1px solid #303b45;

  border-radius: 50%;

  color: #aeb7bf;

  font-size: 0.68rem;

  text-decoration: none;

  transition: all 0.2s ease;

}


.header-social a:hover {

  background: #0d6efd;

  border-color: #0d6efd;

  color: #ffffff;

  transform: translateY(-2px);

}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 991px) {

  .header-tagline {

    display: none;

  }

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 575px) {

  .header-content {

    justify-content: center;

    min-height: 36px;

  }

  .header-left {

    width: 100%;

    justify-content: center;

    gap: 15px;

  }

  .header-right {

    display: none;

  }

  .header-contact {

    font-size: 0.68rem;

  }

}
</style>
```
