<template>

  <div class="projects-page">

    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="projects-hero">

      <div class="projects-hero-overlay"></div>

      <div class="container position-relative">

        <div class="projects-hero-content">

          <span class="hero-label">
            PROJECTS & AUTOMATION
          </span>

          <h1>
            Building Better
            <span>Bakery Production Systems.</span>
          </h1>

          <p>
            From individual bakery machines to complete production lines,
            we help businesses understand, plan, select, install, and
            operate the right equipment for their production requirements.
          </p>

          <div class="hero-actions">

            <router-link
              to="/companies/1/products"
              class="btn btn-primary hero-btn"
            >
              Explore Machinery
              <i class="bi bi-arrow-right"></i>
            </router-link>

            <router-link
              to="/contact"
              class="btn hero-btn-outline"
            >
              Discuss Your Project
              <i class="bi bi-chat-dots"></i>
            </router-link>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         INTRODUCTION
    ====================================================== -->

    <section class="project-intro py-5">

      <div class="container py-lg-5">

        <div class="row align-items-center g-5">

          <div class="col-lg-6">

            <span class="section-label">
              BAKERY PROJECT SOLUTIONS
            </span>

            <h2 class="section-title">
              From Machinery Selection
              <span>to Complete Production Setup</span>
            </h2>

            <p>
              Setting up a bakery is not simply about purchasing machines.
              A successful bakery production system requires proper planning
              of products, production capacity, workflow, machinery,
              manpower, utilities, space, and future expansion.
            </p>

            <p>
              Our project and automation approach focuses on understanding
              the customer's production requirements and developing an
              equipment setup around those requirements.
            </p>

            <p>
              Whether you are starting a small bakery, expanding an existing
              production unit, or planning a larger industrial bakery,
              understanding the complete production flow is essential before
              investing in machinery.
            </p>

            <div class="intro-points">

              <div>
                <i class="bi bi-check-circle-fill"></i>
                <span>Production Planning</span>
              </div>

              <div>
                <i class="bi bi-check-circle-fill"></i>
                <span>Machinery Selection</span>
              </div>

              <div>
                <i class="bi bi-check-circle-fill"></i>
                <span>Production Line Development</span>
              </div>

              <div>
                <i class="bi bi-check-circle-fill"></i>
                <span>Automation & Process Improvement</span>
              </div>

            </div>

          </div>


          <div class="col-lg-6">

            <div class="intro-image">

              <img
                src="@/assets/images/warehouse1.webp"
                alt="Bakery production machinery project"
              />

              <div class="intro-image-overlay"></div>

              <div class="project-image-card">

                <span>
                  PROJECT APPROACH
                </span>

                <strong>
                  Plan → Select → Install → Operate
                </strong>

                <small>
                  A practical approach to bakery production setup.
                </small>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         WHAT IS BAKERY AUTOMATION
    ====================================================== -->

    <section class="automation-intro py-5">

      <div class="container py-lg-5">

        <div class="section-heading text-center">

          <span class="section-label">
            UNDERSTANDING AUTOMATION
          </span>

          <h2 class="section-title">
            What Does Bakery Automation Mean?
          </h2>

          <p>
            Bakery automation means using machinery, controlled processes,
            conveyors, sensors, timers, and production systems to reduce
            manual operations and create a more consistent production flow.
          </p>

        </div>


        <div class="automation-flow mt-5">

          <div class="flow-item">

            <div class="flow-number">
              01
            </div>

            <i class="bi bi-basket2"></i>

            <h4>
              Raw Materials
            </h4>

            <p>
              Flour, water, yeast, sugar, fats, ingredients and other
              materials are prepared according to the production recipe.
            </p>

          </div>


          <div class="flow-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>


          <div class="flow-item">

            <div class="flow-number">
              02
            </div>

            <i class="bi bi-gear-wide-connected"></i>

            <h4>
              Processing
            </h4>

            <p>
              Mixing, kneading, dividing, shaping and other production
              operations are performed using suitable machinery.
            </p>

          </div>


          <div class="flow-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>


          <div class="flow-item">

            <div class="flow-number">
              03
            </div>

            <i class="bi bi-fire"></i>

            <h4>
              Baking
            </h4>

            <p>
              Prepared dough or products move through proofing and baking
              processes according to the production requirement.
            </p>

          </div>


          <div class="flow-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>


          <div class="flow-item">

            <div class="flow-number">
              04
            </div>

            <i class="bi bi-box-seam"></i>

            <h4>
              Cooling & Packing
            </h4>

            <p>
              Finished products are cooled, handled, packed, stored and
              prepared for distribution.
            </p>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         BAKERY PRODUCTION FLOW
    ====================================================== -->

    <section class="production-section py-5">

      <div class="container py-lg-5">

        <div class="section-heading">

          <span class="section-label">
            PRODUCTION FLOW
          </span>

          <h2 class="section-title">
            How a Bakery Production
            <span>System Works</span>
          </h2>

          <p>
            A bakery production line normally consists of multiple stages.
            The exact equipment depends on the product, capacity, available
            space, production method and level of automation.
          </p>

        </div>


        <div class="production-grid mt-5">


          <!-- RAW MATERIAL -->

          <div class="production-card">

            <div class="production-icon">
              <i class="bi bi-boxes"></i>
            </div>

            <div class="production-step">
              STEP 01
            </div>

            <h3>
              Raw Material Handling
            </h3>

            <p>
              Ingredients need to be received, inspected, weighed and
              stored properly before entering production.
            </p>

            <h5>
              Typical Requirements
            </h5>

            <ul>
              <li>Flour storage</li>
              <li>Ingredient storage</li>
              <li>Weighing systems</li>
              <li>Material handling</li>
              <li>Storage racks</li>
            </ul>

          </div>


          <!-- MIXING -->

          <div class="production-card">

            <div class="production-icon">
              <i class="bi bi-arrow-repeat"></i>
            </div>

            <div class="production-step">
              STEP 02
            </div>

            <h3>
              Mixing & Kneading
            </h3>

            <p>
              Ingredients are mixed and developed into dough with the
              required consistency and characteristics.
            </p>

            <h5>
              Typical Equipment
            </h5>

            <ul>
              <li>Dough kneader</li>
              <li>Spiral mixer</li>
              <li>Planetary mixer</li>
              <li>Dough mixer</li>
              <li>Ingredient dosing equipment</li>
            </ul>

          </div>


          <!-- DIVIDING -->

          <div class="production-card">

            <div class="production-icon">
              <i class="bi bi-grid-3x3-gap"></i>
            </div>

            <div class="production-step">
              STEP 03
            </div>

            <h3>
              Dividing & Portioning
            </h3>

            <p>
              Dough is divided into consistent portions according to the
              product size and production requirement.
            </p>

            <h5>
              Typical Equipment
            </h5>

            <ul>
              <li>Dough divider</li>
              <li>Rounder</li>
              <li>Portioning system</li>
              <li>Automatic weighing</li>
            </ul>

          </div>


          <!-- SHAPING -->

          <div class="production-card">

            <div class="production-icon">
              <i class="bi bi-bezier2"></i>
            </div>

            <div class="production-step">
              STEP 04
            </div>

            <h3>
              Dough Forming & Shaping
            </h3>

            <p>
              Depending on the bakery product, dough can be moulded,
              sheeted, rolled, deposited or shaped.
            </p>

            <h5>
              Typical Equipment
            </h5>

            <ul>
              <li>Dough moulder</li>
              <li>Sheeter</li>
              <li>Roller</li>
              <li>Depositor</li>
              <li>Product forming machines</li>
            </ul>

          </div>


          <!-- PROOFING -->

          <div class="production-card">

            <div class="production-icon">
              <i class="bi bi-cloud-sun"></i>
            </div>

            <div class="production-step">
              STEP 05
            </div>

            <h3>
              Proofing & Fermentation
            </h3>

            <p>
              Products requiring fermentation are controlled for
              temperature, humidity and proofing time.
            </p>

            <h5>
              Typical Equipment
            </h5>

            <ul>
              <li>Proofer</li>
              <li>Retarder proofer</li>
              <li>Temperature control</li>
              <li>Humidity control</li>
            </ul>

          </div>


          <!-- BAKING -->

          <div class="production-card">

            <div class="production-icon">
              <i class="bi bi-fire"></i>
            </div>

            <div class="production-step">
              STEP 06
            </div>

            <h3>
              Baking
            </h3>

            <p>
              Baking equipment is selected according to product type,
              batch size, throughput and energy requirements.
            </p>

            <h5>
              Typical Equipment
            </h5>

            <ul>
              <li>Deck oven</li>
              <li>Convection oven</li>
              <li>Rotary rack oven</li>
              <li>Tunnel oven</li>
              <li>Industrial baking systems</li>
            </ul>

          </div>


          <!-- COOLING -->

          <div class="production-card">

            <div class="production-icon">
              <i class="bi bi-wind"></i>
            </div>

            <div class="production-step">
              STEP 07
            </div>

            <h3>
              Cooling & Handling
            </h3>

            <p>
              Baked products require controlled cooling before further
              handling, slicing or packaging.
            </p>

            <h5>
              Typical Equipment
            </h5>

            <ul>
              <li>Cooling racks</li>
              <li>Cooling conveyors</li>
              <li>Handling systems</li>
              <li>Transfer conveyors</li>
            </ul>

          </div>


          <!-- PACKAGING -->

          <div class="production-card">

            <div class="production-icon">
              <i class="bi bi-box-seam"></i>
            </div>

            <div class="production-step">
              STEP 08
            </div>

            <h3>
              Packaging & Dispatch
            </h3>

            <p>
              Finished products can be sliced, packed, labelled and
              prepared for storage and distribution.
            </p>

            <h5>
              Typical Equipment
            </h5>

            <ul>
              <li>Bread slicer</li>
              <li>Packaging machine</li>
              <li>Sealing equipment</li>
              <li>Labelling systems</li>
              <li>Dispatch handling</li>
            </ul>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         SETUP TYPES
    ====================================================== -->

    <section class="setup-section py-5">

      <div class="container py-lg-5">

        <div class="section-heading text-center">

          <span class="section-label">
            CHOOSE YOUR PRODUCTION MODEL
          </span>

          <h2 class="section-title">
            Bakery Setup According
            <span>to Your Business Scale</span>
          </h2>

          <p>
            Every bakery does not require the same level of automation.
            Machinery should be selected according to production volume,
            product range, budget, available space and future growth.
          </p>

        </div>


        <div class="row g-4 mt-4">


          <!-- SMALL -->

          <div class="col-lg-4">

            <div class="setup-card">

              <div class="setup-badge">
                SMALL / START-UP
              </div>

              <h3>
                Small Bakery Setup
              </h3>

              <p>
                Suitable for bakeries starting production at a smaller
                scale or serving a local customer base.
              </p>

              <div class="setup-capacity">
                <i class="bi bi-shop"></i>

                <span>
                  Suitable for
                  <strong>small-scale production</strong>
                </span>
              </div>

              <h5>
                Possible Equipment
              </h5>

              <ul>
                <li>Dough kneader</li>
                <li>Planetary mixer</li>
                <li>Deck / convection oven</li>
                <li>Proofing cabinet</li>
                <li>Work tables</li>
                <li>Cooling racks</li>
                <li>Small packaging equipment</li>
              </ul>

              <div class="setup-note">
                <i class="bi bi-lightbulb"></i>
                Start with essential machinery and plan the layout
                so additional equipment can be added later.
              </div>

            </div>

          </div>


          <!-- MEDIUM -->

          <div class="col-lg-4">

            <div class="setup-card featured">

              <div class="setup-badge">
                MEDIUM PRODUCTION
              </div>

              <h3>
                Semi-Automatic Bakery
              </h3>

              <p>
                Suitable for growing bakeries that need higher output,
                better consistency and reduced manual handling.
              </p>

              <div class="setup-capacity">
                <i class="bi bi-building-gear"></i>

                <span>
                  Suitable for
                  <strong>growing production</strong>
                </span>
              </div>

              <h5>
                Possible Equipment
              </h5>

              <ul>
                <li>Industrial dough mixer</li>
                <li>Dough divider</li>
                <li>Dough rounder</li>
                <li>Dough moulder</li>
                <li>Proofer</li>
                <li>Rotary rack oven</li>
                <li>Cooling system</li>
                <li>Packaging equipment</li>
              </ul>

              <div class="setup-note">
                <i class="bi bi-lightbulb"></i>
                Semi-automation can significantly improve consistency
                while retaining operational flexibility.
              </div>

            </div>

          </div>


          <!-- INDUSTRIAL -->

          <div class="col-lg-4">

            <div class="setup-card">

              <div class="setup-badge">
                INDUSTRIAL
              </div>

              <h3>
                Automated Production Line
              </h3>

              <p>
                Designed for businesses requiring continuous production,
                higher throughput and controlled production processes.
              </p>

              <div class="setup-capacity">
                <i class="bi bi-cpu"></i>

                <span>
                  Suitable for
                  <strong>large-scale production</strong>
                </span>
              </div>

              <h5>
                Possible Equipment
              </h5>

              <ul>
                <li>Automatic ingredient handling</li>
                <li>Industrial mixers</li>
                <li>Automatic divider & rounder</li>
                <li>Moulding systems</li>
                <li>Continuous proofing</li>
                <li>Tunnel oven</li>
                <li>Cooling conveyors</li>
                <li>Automatic packaging line</li>
              </ul>

              <div class="setup-note">
                <i class="bi bi-lightbulb"></i>
                Automated lines require detailed planning of production
                flow, utilities, space and material movement.
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         HOW TO PLAN
    ====================================================== -->

    <section class="planning-section py-5">

      <div class="container py-lg-5">

        <div class="row g-5 align-items-center">

          <div class="col-lg-5">

            <span class="section-label">
              PROJECT PLANNING
            </span>

            <h2 class="section-title">
              Before Buying Machines,
              <span>Plan the Production System</span>
            </h2>

            <p>
              One of the most important parts of a bakery project is
              understanding what the business actually needs before
              selecting machinery.
            </p>

            <p>
              Buying individual machines without considering the complete
              production flow can create bottlenecks, unnecessary labour,
              poor space utilisation and difficult material movement.
            </p>

          </div>


          <div class="col-lg-7">

            <div class="planning-list">


              <div class="planning-item">

                <div class="planning-number">
                  01
                </div>

                <div>

                  <h4>
                    Define Your Products
                  </h4>

                  <p>
                    Decide whether the bakery will produce bread, buns,
                    pizza bases, biscuits, cakes, cookies, pastries or
                    multiple products.
                  </p>

                </div>

              </div>


              <div class="planning-item">

                <div class="planning-number">
                  02
                </div>

                <div>

                  <h4>
                    Calculate Production Capacity
                  </h4>

                  <p>
                    Estimate daily production requirements and peak
                    production demand before selecting machine capacity.
                  </p>

                </div>

              </div>


              <div class="planning-item">

                <div class="planning-number">
                  03
                </div>

                <div>

                  <h4>
                    Decide Automation Level
                  </h4>

                  <p>
                    Determine which operations should remain manual,
                    become semi-automatic or be fully automated.
                  </p>

                </div>

              </div>


              <div class="planning-item">

                <div class="planning-number">
                  04
                </div>

                <div>

                  <h4>
                    Plan Factory Layout
                  </h4>

                  <p>
                    Arrange raw material storage, processing, baking,
                    cooling, packing and dispatch areas for efficient flow.
                  </p>

                </div>

              </div>


              <div class="planning-item">

                <div class="planning-number">
                  05
                </div>

                <div>

                  <h4>
                    Check Utilities
                  </h4>

                  <p>
                    Consider electrical load, gas or fuel requirements,
                    water, ventilation, drainage and other infrastructure.
                  </p>

                </div>

              </div>


              <div class="planning-item">

                <div class="planning-number">
                  06
                </div>

                <div>

                  <h4>
                    Plan Future Expansion
                  </h4>

                  <p>
                    Leave sufficient space and infrastructure for future
                    machinery and increased production capacity.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         EQUIPMENT MATRIX
    ====================================================== -->

    <section class="equipment-section py-5">

      <div class="container py-lg-5">

        <div class="section-heading text-center">

          <span class="section-label">
            EQUIPMENT GUIDE
          </span>

          <h2 class="section-title">
            Bakery Equipment
            <span>by Production Stage</span>
          </h2>

          <p>
            Different machines perform different functions within the
            bakery production process. The correct combination depends
            on the product and production capacity.
          </p>

        </div>


        <div class="equipment-table-wrapper mt-5">

          <table class="equipment-table">

            <thead>

              <tr>
                <th>Production Stage</th>
                <th>Purpose</th>
                <th>Typical Equipment</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td>
                  <strong>Ingredient Handling</strong>
                </td>

                <td>
                  Preparation and weighing of raw materials
                </td>

                <td>
                  Storage systems, weighing equipment, material handling
                </td>

              </tr>


              <tr>

                <td>
                  <strong>Mixing</strong>
                </td>

                <td>
                  Combining ingredients
                </td>

                <td>
                  Planetary mixer, spiral mixer, dough mixer
                </td>

              </tr>


              <tr>

                <td>
                  <strong>Kneading</strong>
                </td>

                <td>
                  Dough development
                </td>

                <td>
                  Dough kneader, industrial mixer
                </td>

              </tr>


              <tr>

                <td>
                  <strong>Dividing</strong>
                </td>

                <td>
                  Consistent dough portions
                </td>

                <td>
                  Dough divider, automatic portioning system
                </td>

              </tr>


              <tr>

                <td>
                  <strong>Shaping</strong>
                </td>

                <td>
                  Forming dough into required shapes
                </td>

                <td>
                  Moulder, sheeter, roller, depositor
                </td>

              </tr>


              <tr>

                <td>
                  <strong>Proofing</strong>
                </td>

                <td>
                  Controlled fermentation
                </td>

                <td>
                  Proofer, retarder proofer
                </td>

              </tr>


              <tr>

                <td>
                  <strong>Baking</strong>
                </td>

                <td>
                  Cooking the prepared product
                </td>

                <td>
                  Deck oven, rotary oven, convection oven, tunnel oven
                </td>

              </tr>


              <tr>

                <td>
                  <strong>Cooling</strong>
                </td>

                <td>
                  Controlled product cooling
                </td>

                <td>
                  Cooling racks, conveyors, cooling systems
                </td>

              </tr>


              <tr>

                <td>
                  <strong>Packaging</strong>
                </td>

                <td>
                  Protecting and preparing products for sale
                </td>

                <td>
                  Slicer, packaging machine, sealing and labelling systems
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </section>


    <!-- =====================================================
         AUTOMATION LEVELS
    ====================================================== -->

    <section class="automation-level-section py-5">

      <div class="container py-lg-5">

        <div class="section-heading text-center">

          <span class="section-label">
            AUTOMATION STRATEGY
          </span>

          <h2 class="section-title">
            From Manual Production
            <span>to Complete Automation</span>
          </h2>

          <p>
            Automation does not always mean replacing every manual process.
            A bakery can gradually automate the operations where it creates
            the greatest improvement in productivity and consistency.
          </p>

        </div>


        <div class="automation-levels mt-5">


          <div class="level-card">

            <div class="level-number">
              01
            </div>

            <div class="level-icon">
              <i class="bi bi-person-workspace"></i>
            </div>

            <h3>
              Manual
            </h3>

            <p>
              Most operations are performed manually with basic equipment.
              Suitable for very small production or specialised products.
            </p>

            <span>
              Basic investment
            </span>

          </div>


          <div class="level-card">

            <div class="level-number">
              02
            </div>

            <div class="level-icon">
              <i class="bi bi-gear"></i>
            </div>

            <h3>
              Semi-Automatic
            </h3>

            <p>
              Key labour-intensive processes such as mixing, dividing,
              shaping and baking are supported by machinery.
            </p>

            <span>
              Balanced investment
            </span>

          </div>


          <div class="level-card featured-level">

            <div class="level-number">
              03
            </div>

            <div class="level-icon">
              <i class="bi bi-cpu"></i>
            </div>

            <h3>
              Automated
            </h3>

            <p>
              Multiple production stages are connected through automated
              equipment, conveyors and controlled processes.
            </p>

            <span>
              Higher productivity
            </span>

          </div>


          <div class="level-card">

            <div class="level-number">
              04
            </div>

            <div class="level-icon">
              <i class="bi bi-diagram-3"></i>
            </div>

            <h3>
              Integrated Line
            </h3>

            <p>
              Production is designed as a coordinated system from raw
              material handling through baking, cooling and packaging.
            </p>

            <span>
              Industrial production
            </span>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         BUSINESS MODEL
    ====================================================== -->

    <section class="business-model-section py-5">

      <div class="container py-lg-5">

        <div class="row align-items-center g-5">

          <div class="col-lg-6">

            <div class="business-image">

              <img
                src="@/assets/images/RamBanner2.png"
                alt="Bakery machinery exhibition and business"
              />

              <div class="business-image-overlay"></div>

              <div class="business-image-content">

                <span>
                  BUILD • PRODUCE • GROW
                </span>

                <h3>
                  Turn Machinery Investment
                  Into a Production Business.
                </h3>

              </div>

            </div>

          </div>


          <div class="col-lg-6">

            <span class="section-label">
              BUILDING A BAKERY BUSINESS
            </span>

            <h2 class="section-title">
              Machinery Is Only One Part
              <span>of the Business</span>
            </h2>

            <p>
              A successful bakery business requires more than machines.
              Production planning, product selection, raw materials,
              quality control, manpower, packaging, sales and distribution
              all need to work together.
            </p>

            <div class="business-model-list">

              <div>

                <i class="bi bi-check-circle-fill"></i>

                <div>

                  <strong>
                    01. Select the Product
                  </strong>

                  <p>
                    Decide what products you want to manufacture and
                    identify the expected market demand.
                  </p>

                </div>

              </div>


              <div>

                <i class="bi bi-check-circle-fill"></i>

                <div>

                  <strong>
                    02. Define Production Capacity
                  </strong>

                  <p>
                    Estimate daily output and determine the required
                    machine capacity.
                  </p>

                </div>

              </div>


              <div>

                <i class="bi bi-check-circle-fill"></i>

                <div>

                  <strong>
                    03. Build the Production System
                  </strong>

                  <p>
                    Select machines that work together rather than
                    purchasing equipment independently.
                  </p>

                </div>

              </div>


              <div>

                <i class="bi bi-check-circle-fill"></i>

                <div>

                  <strong>
                    04. Sell & Distribute
                  </strong>

                  <p>
                    Plan packaging, distribution, retail, wholesale and
                    other sales channels around production capacity.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         PROJECT PROCESS
    ====================================================== -->

    <section class="project-process-section py-5">

      <div class="container py-lg-5">

        <div class="section-heading text-center">

          <span class="section-label">
            HOW WE APPROACH PROJECTS
          </span>

          <h2 class="section-title">
            From Requirement
            <span>to Production</span>
          </h2>

          <p>
            A structured approach helps reduce mistakes when planning a
            bakery machinery project.
          </p>

        </div>


        <div class="process-grid mt-5">

          <div class="process-card">

            <span>
              01
            </span>

            <i class="bi bi-chat-square-text"></i>

            <h4>
              Understand
            </h4>

            <p>
              Understand the product, production target, available space
              and business requirements.
            </p>

          </div>


          <div class="process-card">

            <span>
              02
            </span>

            <i class="bi bi-rulers"></i>

            <h4>
              Plan
            </h4>

            <p>
              Develop a practical production flow and identify suitable
              equipment for each stage.
            </p>

          </div>


          <div class="process-card">

            <span>
              03
            </span>

            <i class="bi bi-tools"></i>

            <h4>
              Install
            </h4>

            <p>
              Arrange installation, setup and commissioning of the
              selected machinery.
            </p>

          </div>


          <div class="process-card">

            <span>
              04
            </span>

            <i class="bi bi-person-gear"></i>

            <h4>
              Operate
            </h4>

            <p>
              Support the customer in understanding machine operation,
              production workflow and basic requirements.
            </p>

          </div>


          <div class="process-card">

            <span>
              05
            </span>

            <i class="bi bi-graph-up-arrow"></i>

            <h4>
              Improve
            </h4>

            <p>
              Identify opportunities to improve production efficiency,
              consistency and material movement.
            </p>

          </div>


          <div class="process-card">

            <span>
              06
            </span>

            <i class="bi bi-plus-circle"></i>

            <h4>
              Expand
            </h4>

            <p>
              Add machinery and automation as production requirements
              increase over time.
            </p>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         IMPORTANT CONSIDERATIONS
    ====================================================== -->

    <section class="consideration-section py-5">

      <div class="container py-lg-5">

        <div class="row g-5">

          <div class="col-lg-5">

            <span class="section-label">
              PROJECT CHECKLIST
            </span>

            <h2 class="section-title">
              Important Things to
              <span>Consider Before Setup</span>
            </h2>

            <p>
              Before finalising a bakery project, several technical and
              business factors should be evaluated together.
            </p>

          </div>


          <div class="col-lg-7">

            <div class="consideration-grid">

              <div>
                <i class="bi bi-rulers"></i>
                <strong>Available Space</strong>
                <span>Factory and production area</span>
              </div>

              <div>
                <i class="bi bi-speedometer2"></i>
                <strong>Production Capacity</strong>
                <span>Expected daily output</span>
              </div>

              <div>
                <i class="bi bi-lightning-charge"></i>
                <strong>Power Requirement</strong>
                <span>Electrical load and utilities</span>
              </div>

              <div>
                <i class="bi bi-fire"></i>
                <strong>Fuel / Gas</strong>
                <span>Heating and baking requirements</span>
              </div>

              <div>
                <i class="bi bi-people"></i>
                <strong>Manpower</strong>
                <span>Operators and production staff</span>
              </div>

              <div>
                <i class="bi bi-arrow-left-right"></i>
                <strong>Material Flow</strong>
                <span>Movement between production stages</span>
              </div>

              <div>
                <i class="bi bi-box-seam"></i>
                <strong>Packaging</strong>
                <span>Finished product handling</span>
              </div>

              <div>
                <i class="bi bi-bar-chart"></i>
                <strong>Future Growth</strong>
                <span>Expansion and automation planning</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         CTA
    ====================================================== -->

    <section class="projects-cta py-5">

      <div class="container">

        <div class="cta-box">

          <div class="row align-items-center">

            <div class="col-lg-8">

              <span class="section-label">
                PLAN YOUR BAKERY PROJECT
              </span>

              <h2>
                Starting a New Bakery
                or Expanding Production?
              </h2>

              <p>
                Tell us about your product, production target, available
                space and machinery requirements. We can help you understand
                the equipment and production stages required for your setup.
              </p>

            </div>


            <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">

              <router-link
                to="/contact"
                class="btn btn-light btn-lg"
              >
                Discuss Your Project
                <i class="bi bi-arrow-right ms-2"></i>
              </router-link>

            </div>

          </div>

        </div>

      </div>

    </section>

  </div>

</template>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.projects-page {
  background: var(--color-white);
  color: var(--color-text);
}


/* =========================================================
   HERO
========================================================= */

.projects-hero {
  min-height: 610px;

  position: relative;

  display: flex;
  align-items: center;

  background:
    url("@/assets/images/bakery-line.png")
    center / cover no-repeat;

  color: var(--color-white);
}

.projects-hero-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(11,23,38,0.97) 0%,
      rgba(11,23,38,0.88) 45%,
      rgba(11,23,38,0.42) 100%
    );
}

.projects-hero-content {
  position: relative;

  max-width: 850px;

  padding: 90px 0;
}

.hero-label {
  color: var(--color-accent);

  font-size: 0.76rem;
  font-weight: 800;

  letter-spacing: 2.5px;
  text-transform: uppercase;
}

.projects-hero h1 {
  margin-top: 16px;

  color: var(--color-white);

  font-size: clamp(2.7rem, 5vw, 4.7rem);
  font-weight: 800;

  line-height: 1.08;
  letter-spacing: -1.5px;
}

.projects-hero h1 span {
  display: block;

  color: var(--color-accent);
}

.projects-hero p {
  max-width: 660px;

  margin: 0 0 31px;

  color: rgba(255,255,255,0.76);

  font-size: 1rem;

  line-height: 1.85;
}


/* =========================================================
   HERO ACTIONS
========================================================= */

.hero-actions {
  display: flex;

  gap: 14px;
  flex-wrap: wrap;

  margin-top: 30px;
}

.hero-btn {
  padding: 13px 23px;

  font-weight: 700;
}

.hero-btn i {
  margin-left: 8px;
}

.hero-btn-outline {
  padding: 12px 23px;

  color: var(--color-white);

  border: 1px solid rgba(255,255,255,0.42);

  background: rgba(255,255,255,0.04);

  font-weight: 700;
}

.hero-btn-outline i {
  margin-left: 8px;
}

.hero-btn-outline:hover {
  color: var(--color-white);

  border-color: var(--color-accent);

  background: rgba(197,138,36,0.12);
}


/* =========================================================
   INTRO
========================================================= */

.project-intro {
  background: var(--color-white);
}

.intro-points {
  margin-top: 25px;
}

.intro-points > div {
  display: flex;
  align-items: center;

  gap: 11px;

  margin-bottom: 11px;

  color: var(--color-heading);

  font-weight: 650;
}

.intro-points i {
  color: var(--color-accent);
}

.intro-image {
  min-height: 520px;

  position: relative;

  overflow: hidden;

  border-radius: 18px;

  box-shadow:
    0 20px 50px var(--color-shadow);
}

.intro-image img {
  width: 100%;
  height: 520px;

  display: block;

  object-fit: cover;
}

.intro-image-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      180deg,
      rgba(11,23,38,0.04),
      rgba(11,23,38,0.78)
    );
}

.project-image-card {
  position: absolute;

  left: 28px;
  right: 28px;
  bottom: 28px;

  padding: 22px;

  border-radius: 13px;

  background: rgba(11,23,38,0.92);

  color: var(--color-white);
}

.project-image-card span {
  display: block;

  color: var(--color-accent);

  font-size: 0.72rem;
  font-weight: 800;

  letter-spacing: 1.8px;
}

.project-image-card strong {
  display: block;

  margin-top: 7px;

  font-size: 1.15rem;
}

.project-image-card small {
  display: block;

  margin-top: 5px;

  color: #b8c4cf;

  line-height: 1.6;
}


/* =========================================================
   AUTOMATION INTRO
========================================================= */

.automation-intro {
  background: var(--color-light-bg);
}

.section-heading {
  max-width: 800px;

  margin: auto;
}

.section-heading > p {
  margin-top: 15px;

  color: var(--color-text-light);

  line-height: 1.85;
}

.automation-flow {
  display: grid;

  grid-template-columns:
    1fr auto 1fr auto 1fr auto 1fr;

  align-items: center;

  gap: 18px;
}

.flow-item {
  height: 100%;

  padding: 28px;

  border: 1px solid var(--color-border);

  border-radius: 15px;

  background: var(--color-white);

  box-shadow:
    0 8px 25px rgba(11,23,38,0.04);
}

.flow-number {
  color: var(--color-accent);

  font-size: 0.72rem;
  font-weight: 800;

  letter-spacing: 1px;
}

.flow-item > i {
  display: block;

  margin-top: 17px;

  color: var(--color-primary);

  font-size: 1.8rem;
}

.flow-item h4 {
  margin-top: 14px;

  color: var(--color-heading);
}

.flow-item p {
  margin-bottom: 0;

  color: var(--color-text-light);
}

.flow-arrow {
  color: var(--color-accent);

  font-size: 1.4rem;
}


/* =========================================================
   PRODUCTION
========================================================= */

.production-section {
  background: var(--color-white);
}

.production-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 18px;
}

.production-card {
  height: 100%;

  padding: 27px;

  border: 1px solid var(--color-border);

  border-radius: 15px;

  background: var(--color-white);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.production-card:hover {
  transform: translateY(-6px);

  border-color: #c5d3df;

  box-shadow:
    0 18px 38px rgba(11,23,38,0.08);
}

.production-icon {
  width: 54px;
  height: 54px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  background: var(--color-primary-light);

  color: var(--color-primary);

  font-size: 1.4rem;
}

.production-step {
  margin-top: 18px;

  color: var(--color-accent);

  font-size: 0.7rem;
  font-weight: 800;

  letter-spacing: 1.5px;
}

.production-card h3 {
  margin-top: 8px;

  color: var(--color-heading);

  font-size: 1.15rem;
}

.production-card p {
  color: var(--color-text-light);
}

.production-card h5 {
  margin-top: 18px;

  color: var(--color-heading);

  font-size: 0.88rem;
}

.production-card ul {
  margin: 10px 0 0;
  padding-left: 18px;

  color: var(--color-text);

  line-height: 1.8;
}


/* =========================================================
   SETUP
========================================================= */

.setup-section {
  background: var(--color-light-bg);
}

.setup-card {
  height: 100%;

  padding: 32px;

  position: relative;

  border: 1px solid var(--color-border);

  border-radius: 16px;

  background: var(--color-white);

  transition: all 0.3s ease;
}

.setup-card:hover {
  transform: translateY(-5px);

  box-shadow:
    0 18px 40px rgba(11,23,38,0.08);
}

.setup-card.featured {
  border-color: var(--color-primary);

  box-shadow:
    0 15px 35px rgba(27,94,140,0.10);
}

.setup-badge {
  display: inline-block;

  padding: 6px 10px;

  border-radius: 5px;

  background: var(--color-primary-light);

  color: var(--color-primary);

  font-size: 0.68rem;
  font-weight: 800;

  letter-spacing: 1px;
}

.setup-card h3 {
  margin-top: 18px;

  color: var(--color-heading);
}

.setup-card > p {
  color: var(--color-text-light);
}

.setup-capacity {
  display: flex;
  align-items: center;

  gap: 12px;

  margin: 22px 0;

  padding: 14px;

  border-radius: 10px;

  background: var(--color-surface-soft);
}

.setup-capacity i {
  color: var(--color-primary);

  font-size: 1.35rem;
}

.setup-capacity span {
  color: var(--color-text-light);

  font-size: 0.84rem;
}

.setup-capacity strong {
  display: block;

  margin-top: 2px;

  color: var(--color-heading);
}

.setup-card h5 {
  margin-top: 20px;

  color: var(--color-heading);
}

.setup-card ul {
  margin: 10px 0 0;

  padding-left: 19px;

  color: var(--color-text);

  line-height: 1.9;
}

.setup-note {
  margin-top: 22px;

  padding: 14px;

  border-left: 3px solid var(--color-accent);

  background: #faf7f0;

  color: var(--color-text);

  font-size: 0.84rem;

  line-height: 1.7;
}

.setup-note i {
  margin-right: 7px;

  color: var(--color-accent);
}


/* =========================================================
   PLANNING
========================================================= */

.planning-section {
  background: var(--color-white);
}

.planning-list {
  display: grid;

  gap: 14px;
}

.planning-item {
  display: flex;

  gap: 17px;

  padding: 21px;

  border: 1px solid var(--color-border);

  border-radius: 13px;

  background: var(--color-surface-soft);
}

.planning-number {
  width: 42px;
  height: 42px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: var(--color-primary);

  color: var(--color-white);

  font-size: 0.74rem;
  font-weight: 800;
}

.planning-item h4 {
  margin-bottom: 6px;

  color: var(--color-heading);
}

.planning-item p {
  margin-bottom: 0;

  color: var(--color-text-light);
}


/* =========================================================
   EQUIPMENT TABLE
========================================================= */

.equipment-section {
  background: var(--color-light-bg);
}

.equipment-table-wrapper {
  overflow-x: auto;

  border: 1px solid var(--color-border);

  border-radius: 15px;

  background: var(--color-white);
}

.equipment-table {
  width: 100%;

  border-collapse: collapse;

  min-width: 800px;
}

.equipment-table th {
  padding: 18px 20px;

  background: var(--color-dark);

  color: var(--color-white);

  font-size: 0.82rem;

  font-weight: 700;

  text-align: left;
}

.equipment-table td {
  padding: 18px 20px;

  border-bottom: 1px solid var(--color-border);

  color: var(--color-text);

  vertical-align: top;

  line-height: 1.7;
}

.equipment-table tr:last-child td {
  border-bottom: none;
}

.equipment-table td strong {
  color: var(--color-heading);
}


/* =========================================================
   AUTOMATION LEVEL
========================================================= */

.automation-level-section {
  background: var(--color-white);
}

.automation-levels {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 18px;
}

.level-card {
  position: relative;

  padding: 28px;

  border: 1px solid var(--color-border);

  border-radius: 15px;

  background: var(--color-white);
}

.level-card.featured-level {
  border-color: var(--color-primary);

  box-shadow:
    0 15px 35px rgba(27,94,140,0.09);
}

.level-number {
  color: var(--color-accent);

  font-size: 0.72rem;
  font-weight: 800;

  letter-spacing: 1px;
}

.level-icon {
  margin-top: 17px;

  color: var(--color-primary);

  font-size: 1.7rem;
}

.level-card h3 {
  margin-top: 14px;

  color: var(--color-heading);
}

.level-card p {
  color: var(--color-text-light);
}

.level-card span {
  display: inline-block;

  margin-top: 7px;

  padding: 5px 9px;

  border-radius: 5px;

  background: var(--color-primary-light);

  color: var(--color-primary);

  font-size: 0.72rem;
  font-weight: 700;
}


/* =========================================================
   BUSINESS MODEL
========================================================= */

.business-model-section {
  background: var(--color-light-bg);
}

.business-image {
  min-height: 510px;

  position: relative;

  overflow: hidden;

  border-radius: 18px;
}

.business-image img {
  width: 100%;
  height: 510px;

  object-fit: cover;
}

.business-image-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      180deg,
      rgba(11,23,38,0.05),
      rgba(11,23,38,0.82)
    );
}

.business-image-content {
  position: absolute;

  left: 30px;
  right: 30px;
  bottom: 30px;

  color: var(--color-white);
}

.business-image-content span {
  color: var(--color-accent);

  font-size: 0.72rem;
  font-weight: 800;

  letter-spacing: 1.8px;
}

.business-image-content h3 {
  max-width: 500px;

  margin-top: 10px;

  color: var(--color-white);

  font-size: 2rem;
}

.business-model-list {
  margin-top: 28px;
}

.business-model-list > div {
  display: flex;

  gap: 13px;

  margin-bottom: 20px;
}

.business-model-list i {
  margin-top: 4px;

  flex-shrink: 0;

  color: var(--color-accent);
}

.business-model-list strong {
  color: var(--color-heading);
}

.business-model-list p {
  margin-top: 4px;

  margin-bottom: 0;

  color: var(--color-text-light);
}


/* =========================================================
   PROJECT PROCESS
========================================================= */

.project-process-section {
  background: var(--color-white);
}

.process-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 18px;
}

.process-card {
  padding: 28px;

  border: 1px solid var(--color-border);

  border-radius: 14px;

  background: var(--color-surface-soft);

  transition: all 0.3s ease;
}

.process-card:hover {
  transform: translateY(-5px);

  background: var(--color-white);

  box-shadow:
    0 15px 35px rgba(11,23,38,0.07);
}

.process-card > span {
  color: var(--color-accent);

  font-size: 0.72rem;
  font-weight: 800;

  letter-spacing: 1px;
}

.process-card i {
  display: block;

  margin-top: 17px;

  color: var(--color-primary);

  font-size: 1.7rem;
}

.process-card h4 {
  margin-top: 14px;

  color: var(--color-heading);
}

.process-card p {
  margin-bottom: 0;

  color: var(--color-text-light);
}


/* =========================================================
   CONSIDERATIONS
========================================================= */

.consideration-section {
  background: var(--color-light-bg);
}

.consideration-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 13px;
}

.consideration-grid > div {
  display: grid;

  grid-template-columns: 42px 1fr;

  column-gap: 13px;

  padding: 17px;

  border: 1px solid var(--color-border);

  border-radius: 12px;

  background: var(--color-white);
}

.consideration-grid i {
  grid-row: span 2;

  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: var(--color-primary-light);

  color: var(--color-primary);
}

.consideration-grid strong {
  color: var(--color-heading);

  font-size: 0.92rem;
}

.consideration-grid span {
  color: var(--color-text-light);

  font-size: 0.78rem;
}


/* =========================================================
   CTA
========================================================= */

.projects-cta {
  background: var(--color-white);
}

.cta-box {
  padding: 58px;

  border-radius: 20px;

  background:
    linear-gradient(
      135deg,
      var(--color-dark),
      #163750
    );

  color: var(--color-white);

  box-shadow:
    0 20px 50px var(--color-shadow-heavy);
}

.cta-box .section-label {
  color: var(--color-accent);
}

.cta-box h2 {
  max-width: 720px;

  margin-top: 11px;

  color: var(--color-white);

  font-size: clamp(2rem, 4vw, 3rem);

  font-weight: 800;

  line-height: 1.15;
}

.cta-box p {
  max-width: 720px;

  margin-top: 16px;

  color: rgba(255,255,255,0.76);

  line-height: 1.85;
}

.cta-box .btn-light {
  padding: 13px 23px;

  color: var(--color-heading);

  font-weight: 750;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1199px) {

  .production-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .automation-levels {
    grid-template-columns: repeat(2, 1fr);
  }

}


@media (max-width: 991px) {

  .projects-hero {
    min-height: 540px;
  }

  .automation-flow {
    grid-template-columns: repeat(2, 1fr);
  }

  .flow-arrow {
    display: none;
  }

  .production-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}


@media (max-width: 767px) {

  .projects-hero {
    min-height: 560px;
  }

  .projects-hero-content {
    padding: 65px 0;
  }

  .projects-hero p {
    font-size: 0.94rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-btn,
  .hero-btn-outline {
    width: 100%;

    text-align: center;
  }

  .intro-image,
  .intro-image img {
    min-height: 370px;
    height: 370px;
  }

  .automation-flow {
    grid-template-columns: 1fr;
  }

  .production-grid {
    grid-template-columns: 1fr;
  }

  .automation-levels {
    grid-template-columns: 1fr;
  }

  .business-image,
  .business-image img {
    min-height: 370px;
    height: 370px;
  }

  .process-grid {
    grid-template-columns: 1fr;
  }

  .consideration-grid {
    grid-template-columns: 1fr;
  }

  .cta-box {
    padding: 38px 25px;
  }

}


@media (max-width: 480px) {

  .projects-hero h1 {
    font-size: 2.45rem;
  }

  .project-image-card {
    left: 18px;
    right: 18px;
    bottom: 18px;
  }

  .production-card,
  .setup-card,
  .level-card,
  .process-card {
    padding: 24px;
  }

  .business-image-content {
    left: 22px;
    right: 22px;
    bottom: 22px;
  }

  .business-image-content h3 {
    font-size: 1.65rem;
  }

}

</style>