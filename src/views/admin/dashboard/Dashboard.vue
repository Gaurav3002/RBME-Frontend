<template>
  <div class="dashboard">

    <!-- =========================
         HEADER
    ========================== -->
    <div class="dashboard-header">

      <div>
        <h1>Project Enquiries</h1>
        <p>Every enquiry submitted through the website, in one place.</p>
      </div>

      <button
        type="button"
        class="refresh-btn"
        :disabled="loading"
        @click="loadEnquiries"
      >
        <i class="bi bi-arrow-clockwise" :class="{ spinning: loading }"></i>
        Refresh
      </button>

    </div>


    <!-- =========================
         DATE FILTER BAR
    ========================== -->
    <div class="date-filter-bar">

      <div class="date-chips">

        <button
          v-for="opt in dateOptions"
          :key="opt.value"
          type="button"
          class="date-chip"
          :class="{ active: dateFilter === opt.value }"
          @click="selectDateFilter(opt.value)"
        >
          {{ opt.label }}
        </button>

      </div>

      <div class="custom-range" v-if="dateFilter === 'custom'">

        <input
          type="date"
          v-model="customStart"
          class="date-input"
        />

        <span class="range-sep">to</span>

        <input
          type="date"
          v-model="customEnd"
          class="date-input"
        />

      </div>

      <div class="range-readout" v-else>
        {{ activeRangeLabel }}
      </div>

    </div>


    <!-- =========================
         STATS STRIP
    ========================== -->
    <div class="stats-strip">

      <button
        type="button"
        class="stat"
        :class="{ active: statusFilter === 'all' }"
        @click="statusFilter = 'all'"
      >
        <span class="stat-value">{{ dateFilteredEnquiries.length }}</span>
        <span class="stat-label">All</span>
      </button>

      <button
        v-for="s in statusOrder"
        :key="s"
        type="button"
        class="stat"
        :class="{ active: statusFilter === s }"
        @click="statusFilter = s"
      >
        <span
          class="stat-value"
          :style="{ color: statusColor(s) }"
        >
          {{ countByStatus(s) }}
        </span>
        <span class="stat-label">{{ formatStatus(s) }}</span>
      </button>

    </div>


    <!-- =========================
         CHARTS
    ========================== -->
    <div v-if="!loading && !error" class="charts-row">

      <!-- ENQUIRIES OVER TIME -->
      <div class="chart-card">

        <div class="chart-card-header">
          <h3>Enquiries received</h3>
          <span>Last 7 days</span>
        </div>

        <div class="bar-chart">

          <div
            v-for="day in last7Days"
            :key="day.key"
            class="bar-col"
          >

            <div class="bar-track">
              <div
                class="bar-fill"
                :style="{ height: barHeight(day.count) + '%' }"
                :title="`${day.count} enquiries`"
              ></div>
            </div>

            <span class="bar-count">{{ day.count }}</span>
            <span class="bar-label">{{ day.label }}</span>

          </div>

        </div>

      </div>


      <!-- STATUS BREAKDOWN -->
      <div class="chart-card">

        <div class="chart-card-header">
          <h3>Status breakdown</h3>
          <span>{{ dateFilteredEnquiries.length }} in range</span>
        </div>

        <div class="status-bar" v-if="dateFilteredEnquiries.length">
          <div
            v-for="s in statusOrder"
            :key="s"
            class="status-bar-segment"
            :style="{
              width: statusPercent(s) + '%',
              background: statusColor(s)
            }"
            :title="`${formatStatus(s)}: ${countByStatus(s)}`"
          ></div>
        </div>

        <div class="status-legend">
          <div
            v-for="s in statusOrder"
            :key="s"
            class="legend-item"
          >
            <span class="legend-dot" :style="{ background: statusColor(s) }"></span>
            <span class="legend-label">{{ formatStatus(s) }}</span>
            <span class="legend-count">{{ countByStatus(s) }}</span>
          </div>
        </div>

      </div>

    </div>


    <!-- =========================
         LOADING
    ========================== -->
    <div v-if="loading" class="state-panel">
      Loading enquiries&hellip;
    </div>


    <!-- =========================
         ERROR
    ========================== -->
    <div v-else-if="error" class="state-panel error">
      Couldn't load enquiries. {{ error }}
      <button type="button" class="retry-link" @click="loadEnquiries">
        Try again
      </button>
    </div>


    <!-- =========================
         EMPTY
    ========================== -->
    <div v-else-if="filteredEnquiries.length === 0" class="state-panel">
      No enquiries for this filter.
    </div>


    <!-- =========================
         TABLE
    ========================== -->
    <div v-else class="table-wrap">

      <table class="enquiry-table">

        <thead>
          <tr>
            <th>Contact</th>
            <th>Company</th>
            <th>Requirement</th>
            <th>Received</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="enquiry in filteredEnquiries"
            :key="enquiry.id"
          >

            <td>
              <div class="contact-name">
                {{ enquiry.name || enquiry.fullName || "—" }}
              </div>

              <div class="contact-meta">
                <a
                  v-if="enquiry.email"
                  :href="`mailto:${enquiry.email}`"
                >
                  {{ enquiry.email }}
                </a>

                <a
                  v-if="enquiry.phone"
                  :href="`tel:${enquiry.phone}`"
                >
                  {{ enquiry.phone }}
                </a>
              </div>
            </td>

            <td>
              {{ enquiry.companyName || enquiry.company || "—" }}
            </td>

            <td class="requirement-cell">
              {{ enquiry.message || enquiry.requirement || enquiry.description || "—" }}
            </td>

            <td class="date-cell">
              {{ formatDate(enquiry.createdAt) }}
            </td>

            <td>
              <select
                class="status-select"
                :style="{
                  color: statusColor(enquiry.status),
                  borderColor: statusColor(enquiry.status)
                }"
                :value="enquiry.status"
                :disabled="updatingId === enquiry.id"
                @change="onStatusChange(enquiry, $event.target.value)"
              >
                <option
                  v-for="s in statusOrder"
                  :key="s"
                  :value="s"
                >
                  {{ formatStatus(s) }}
                </option>
              </select>
            </td>

          </tr>
        </tbody>

      </table>

    </div>

  </div>
</template>


<script setup>

import { ref, computed, onMounted } from "vue";

import {
  getAllEnquiries,
  updateEnquiryStatus
} from "@/publicApis/company.api";


// =========================
// STATE
// =========================

const enquiries = ref([]);
const loading = ref(false);
const error = ref("");
const statusFilter = ref("all");
const updatingId = ref(null);

const statusOrder = ["NEW", "IN_PROGRESS", "WON", "REJECTED"];

const dateFilter = ref("today");
const customStart = ref("");
const customEnd = ref("");

const dateOptions = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "week", label: "Last 7 Days" },
  { value: "month", label: "This Month" },
  { value: "all", label: "All Time" },
  { value: "custom", label: "Custom Range" }
];


// =========================
// LOAD ENQUIRIES
// =========================

const loadEnquiries = async () => {

  loading.value = true;
  error.value = "";

  try {

    const response = await getAllEnquiries();

    enquiries.value = response.data || [];

  } catch (err) {

    console.error("Error loading enquiries:", err);

    error.value = err?.response?.data?.message || "Please try again.";

    enquiries.value = [];

  } finally {

    loading.value = false;

  }

};


// =========================
// DATE HELPERS
// =========================

const toDateOnly = (value) => {

  const d = new Date(value);

  if (Number.isNaN(d.getTime())) return null;

  d.setHours(0, 0, 0, 0);

  return d;

};


const today = () => {

  const d = new Date();

  d.setHours(0, 0, 0, 0);

  return d;

};


const selectDateFilter = (value) => {

  dateFilter.value = value;

  if (value === "custom" && !customStart.value) {

    const t = today();

    const iso = t.toISOString().slice(0, 10);

    customStart.value = iso;
    customEnd.value = iso;

  }

};


// =========================
// DATE-FILTERED LIST
// =========================

const dateFilteredEnquiries = computed(() => {

  if (dateFilter.value === "all") {
    return enquiries.value;
  }

  const t = today();

  return enquiries.value.filter((e) => {

    const d = toDateOnly(e.createdAt);

    if (!d) return false;

    if (dateFilter.value === "today") {
      return d.getTime() === t.getTime();
    }

    if (dateFilter.value === "yesterday") {
      const y = new Date(t);
      y.setDate(y.getDate() - 1);
      return d.getTime() === y.getTime();
    }

    if (dateFilter.value === "week") {
      const weekAgo = new Date(t);
      weekAgo.setDate(weekAgo.getDate() - 6);
      return d.getTime() >= weekAgo.getTime() && d.getTime() <= t.getTime();
    }

    if (dateFilter.value === "month") {
      return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth();
    }

    if (dateFilter.value === "custom") {

      if (!customStart.value || !customEnd.value) return true;

      const start = toDateOnly(customStart.value);
      const end = toDateOnly(customEnd.value);

      return d.getTime() >= start.getTime() && d.getTime() <= end.getTime();

    }

    return true;

  });

});


// =========================
// STATUS + DATE COMBINED
// =========================

const filteredEnquiries = computed(() => {

  if (statusFilter.value === "all") {
    return dateFilteredEnquiries.value;
  }

  return dateFilteredEnquiries.value.filter(
    (e) => e.status === statusFilter.value
  );

});


// =========================
// RANGE LABEL
// =========================

const activeRangeLabel = computed(() => {

  const opt = dateOptions.find((o) => o.value === dateFilter.value);

  return opt ? opt.label : "";

});


// =========================
// COUNTS
// =========================

const countByStatus = (status) => {

  return dateFilteredEnquiries.value.filter(
    (e) => e.status === status
  ).length;

};


const statusPercent = (status) => {

  const total = dateFilteredEnquiries.value.length;

  if (!total) return 0;

  return (countByStatus(status) / total) * 100;

};


// =========================
// LAST 7 DAYS CHART DATA
// =========================

const last7Days = computed(() => {

  const days = [];

  const t = today();

  for (let i = 6; i >= 0; i--) {

    const d = new Date(t);

    d.setDate(d.getDate() - i);

    const count = enquiries.value.filter((e) => {

      const ed = toDateOnly(e.createdAt);

      return ed && ed.getTime() === d.getTime();

    }).length;

    days.push({
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-IN", { weekday: "short" }),
      count
    });

  }

  return days;

});


const barHeight = (count) => {

  const max = Math.max(...last7Days.value.map((d) => d.count), 1);

  return (count / max) * 100;

};


// =========================
// STATUS UPDATE
// =========================

const onStatusChange = async (enquiry, newStatus) => {

  const previousStatus = enquiry.status;

  updatingId.value = enquiry.id;

  enquiry.status = newStatus;

  try {

    await updateEnquiryStatus(enquiry.id, newStatus);

  } catch (err) {

    console.error("Error updating status:", err);

    enquiry.status = previousStatus;

    alert("Couldn't update status. Please try again.");

  } finally {

    updatingId.value = null;

  }

};


// =========================
// FORMATTERS
// =========================

const formatStatus = (status) => {

  if (!status) return "—";

  return status
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

};


const formatDate = (value) => {

  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

};


const statusColor = (status) => {

  const colors = {
    NEW: "#B7791F",
    IN_PROGRESS: "#2B6CB0",
    WON: "#2F855A",
    REJECTED: "#718096"
  };

  return colors[status] || "#5B6B7A";

};


// =========================
// LIFECYCLE
// =========================

onMounted(() => {
  loadEnquiries();
});

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.dashboard {
  padding: 32px 36px 60px;

  background: #f7f8fa;

  min-height: 100vh;

  font-family: inherit;
}


/* =====================================================
   HEADER
===================================================== */

.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 24px;
}


.dashboard-header h1 {
  margin: 0;

  color: #1c2a38;

  font-size: 24px;
  font-weight: 800;

  letter-spacing: -0.2px;
}


.dashboard-header p {
  margin: 6px 0 0;

  color: #5b6b7a;

  font-size: 13.5px;
}


.refresh-btn {
  display: flex;
  align-items: center;

  gap: 8px;

  padding: 10px 16px;

  background: #ffffff;

  border: 1px solid #d8dee4;

  color: #1c2a38;

  font-size: 13px;
  font-weight: 650;

  cursor: pointer;

  transition: background 0.2s ease, border-color 0.2s ease;
}


.refresh-btn:hover:not(:disabled) {
  background: #f0f3f6;

  border-color: #c3ccd4;
}


.refresh-btn:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}


.spinning {
  animation: spin 0.8s linear infinite;
}


@keyframes spin {
  to { transform: rotate(360deg); }
}


/* =====================================================
   DATE FILTER BAR
===================================================== */

.date-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-wrap: wrap;

  gap: 12px;

  margin-bottom: 16px;

  padding: 14px 18px;

  background: #ffffff;

  border: 1px solid #e3e8ed;
}


.date-chips {
  display: flex;
  flex-wrap: wrap;

  gap: 8px;
}


.date-chip {
  padding: 7px 14px;

  background: #f7f8fa;

  border: 1px solid #e3e8ed;

  color: #5b6b7a;

  font-size: 12.5px;
  font-weight: 650;

  cursor: pointer;

  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}


.date-chip:hover {
  border-color: #c3ccd4;
}


.date-chip.active {
  background: #1c2a38;

  border-color: #1c2a38;

  color: #ffffff;
}


.custom-range {
  display: flex;
  align-items: center;

  gap: 8px;
}


.date-input {
  padding: 7px 10px;

  border: 1px solid #d8dee4;

  color: #1c2a38;

  font-size: 12.5px;
  font-family: inherit;
}


.range-sep {
  color: #7d8995;

  font-size: 12px;
}


.range-readout {
  color: #7d8995;

  font-size: 12.5px;
  font-weight: 600;
}


/* =====================================================
   STATS STRIP
===================================================== */

.stats-strip {
  display: flex;

  gap: 10px;

  margin-bottom: 24px;
}


.stat {
  display: flex;
  flex-direction: column;

  align-items: flex-start;

  gap: 4px;

  padding: 14px 20px;

  background: #ffffff;

  border: 1px solid #e3e8ed;
  border-bottom: 2px solid transparent;

  cursor: pointer;

  transition: border-color 0.2s ease;
}


.stat.active {
  border-bottom-color: #1c2a38;
}


.stat-value {
  color: #1c2a38;

  font-size: 22px;
  font-weight: 800;

  line-height: 1;
}


.stat-label {
  color: #7d8995;

  font-size: 12px;
  font-weight: 600;
}


/* =====================================================
   CHARTS
===================================================== */

.charts-row {
  display: grid;
  grid-template-columns: 1.3fr 1fr;

  gap: 16px;

  margin-bottom: 24px;
}


.chart-card {
  padding: 20px;

  background: #ffffff;

  border: 1px solid #e3e8ed;
}


.chart-card-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  margin-bottom: 18px;
}


.chart-card-header h3 {
  margin: 0;

  color: #1c2a38;

  font-size: 14px;
  font-weight: 750;
}


.chart-card-header span {
  color: #7d8995;

  font-size: 11.5px;
  font-weight: 600;
}


/* ---------- BAR CHART ---------- */

.bar-chart {
  display: flex;
  align-items: flex-end;

  gap: 10px;

  height: 140px;
}


.bar-col {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
}


.bar-track {
  flex: 1;

  width: 100%;

  display: flex;
  align-items: flex-end;

  justify-content: center;
}


.bar-fill {
  width: 60%;

  min-height: 3px;

  background: #2b6cb0;

  transition: height 0.3s ease;
}


.bar-count {
  margin-top: 6px;

  color: #1c2a38;

  font-size: 11px;
  font-weight: 700;
}


.bar-label {
  margin-top: 2px;

  color: #9aa5af;

  font-size: 10.5px;
}


/* ---------- STATUS BAR ---------- */

.status-bar {
  display: flex;

  width: 100%;
  height: 12px;

  overflow: hidden;

  background: #f0f3f6;

  margin-bottom: 18px;
}


.status-bar-segment {
  height: 100%;

  transition: width 0.3s ease;
}


.status-legend {
  display: flex;
  flex-direction: column;

  gap: 10px;
}


.legend-item {
  display: flex;
  align-items: center;

  gap: 8px;
}


.legend-dot {
  width: 9px;
  height: 9px;

  border-radius: 50%;

  flex-shrink: 0;
}


.legend-label {
  flex: 1;

  color: #3e4d5b;

  font-size: 12.5px;
  font-weight: 600;
}


.legend-count {
  color: #1c2a38;

  font-size: 12.5px;
  font-weight: 750;
}


/* =====================================================
   STATE PANELS
===================================================== */

.state-panel {
  padding: 60px 20px;

  background: #ffffff;

  border: 1px solid #e3e8ed;

  color: #5b6b7a;

  font-size: 14px;

  text-align: center;
}


.state-panel.error {
  color: #b7291f;
}


.retry-link {
  margin-left: 10px;

  background: none;
  border: none;

  color: #2b6cb0;

  font-weight: 650;

  cursor: pointer;

  text-decoration: underline;
}


/* =====================================================
   TABLE
===================================================== */

.table-wrap {
  background: #ffffff;

  border: 1px solid #e3e8ed;

  overflow-x: auto;
}


.enquiry-table {
  width: 100%;

  border-collapse: collapse;

  font-size: 13.5px;
}


.enquiry-table thead th {
  padding: 14px 18px;

  background: #f7f8fa;

  border-bottom: 1px solid #e3e8ed;

  color: #5b6b7a;

  font-size: 11.5px;
  font-weight: 700;

  text-align: left;

  white-space: nowrap;
}


.enquiry-table tbody td {
  padding: 16px 18px;

  border-bottom: 1px solid #edf0f3;

  color: #1c2a38;

  vertical-align: top;
}


.enquiry-table tbody tr:last-child td {
  border-bottom: 0;
}


.enquiry-table tbody tr:hover {
  background: #fafbfc;
}


.contact-name {
  font-weight: 700;
}


.contact-meta {
  display: flex;
  flex-direction: column;

  gap: 2px;

  margin-top: 4px;
}


.contact-meta a {
  color: #5b6b7a;

  font-size: 12px;

  text-decoration: none;
}


.contact-meta a:hover {
  color: #2b6cb0;

  text-decoration: underline;
}


.requirement-cell {
  max-width: 320px;

  color: #3e4d5b;

  line-height: 1.5;
}


.date-cell {
  color: #5b6b7a;

  white-space: nowrap;
}


/* =====================================================
   STATUS SELECT
===================================================== */

.status-select {
  padding: 6px 10px;

  background: #ffffff;

  border: 1px solid;

  font-size: 12px;
  font-weight: 700;

  cursor: pointer;
}


.status-select:disabled {
  opacity: 0.5;

  cursor: not-allowed;
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 900px) {

  .charts-row {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 768px) {

  .dashboard {
    padding: 20px 16px 40px;
  }


  .dashboard-header {
    flex-direction: column;
  }


  .date-filter-bar {
    flex-direction: column;
    align-items: flex-start;
  }


  .stats-strip {
    overflow-x: auto;
  }

}

</style>