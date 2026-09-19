<template>
    <div class="container-fluid document-settings">

        <!-- =====================================================
             PAGE HEADER
        ====================================================== -->
        <div class="page-header">

            <div class="page-header-content">

                <div class="page-title-wrap">

                    <div class="page-title-icon">
                        <i class="bi bi-file-earmark-text"></i>
                    </div>

                    <div>

                        <h3 class="page-title">
                            Document Settings
                        </h3>

                        <p class="page-subtitle">
                            Configure quotation and invoice document content
                        </p>

                    </div>

                </div>


                <button
                    v-if="canCreate"
                    type="button"
                    class="btn btn-primary add-document-btn"
                    @click="openAddModal"
                >
                    <i class="bi bi-plus-lg"></i>
                    Add Document
                </button>

            </div>

        </div>


        <!-- =====================================================
             ERROR MESSAGE
        ====================================================== -->
        <div
            v-if="errorMessage"
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
        >

            <i class="bi bi-exclamation-triangle me-2"></i>

            {{ errorMessage }}

            <button
                type="button"
                class="btn-close"
                @click="errorMessage = ''"
            ></button>

        </div>


        <!-- =====================================================
             DOCUMENT TABLE
        ====================================================== -->
        <div class="card document-setting-card">

            <!-- CARD HEADER -->
            <div class="card-header document-setting-card-header">

                <div>

                    <h5 class="document-setting-card-title">
                        Document Settings
                    </h5>

                    <span class="document-setting-card-count">

                        {{ documentSettings.length }}

                        {{
                            documentSettings.length === 1
                                ? "document"
                                : "documents"
                        }}

                    </span>

                </div>


                <button
                    type="button"
                    class="btn btn-light btn-sm refresh-btn"
                    :disabled="loading"
                    @click="loadDocumentSettings"
                >

                    <i
                        class="bi bi-arrow-clockwise"
                        :class="{ spin: loading }"
                    ></i>

                    Refresh

                </button>

            </div>


            <!-- CARD BODY -->
            <div class="card-body p-0">

                <!-- =================================================
                     LOADING
                ================================================== -->
                <div
                    v-if="loading"
                    class="table-state"
                >

                    <div class="spinner-border text-primary"></div>

                    <p>
                        Loading document settings...
                    </p>

                </div>


                <!-- =================================================
                     EMPTY
                ================================================== -->
                <div
                    v-else-if="documentSettings.length === 0"
                    class="table-state"
                >

                    <div class="empty-icon">
                        <i class="bi bi-file-earmark-text"></i>
                    </div>

                    <h6>
                        No Document Settings
                    </h6>

                    <p>
                        Add quotation or invoice document settings to get started.
                    </p>

                    <button
                        v-if="canCreate"
                        type="button"
                        class="btn btn-primary"
                        @click="openAddModal"
                    >

                        <i class="bi bi-plus-lg me-1"></i>

                        Add Document

                    </button>

                </div>


                <!-- =================================================
                     TABLE
                ================================================== -->
                <div
                    v-else
                    class="table-responsive"
                >

                    <table class="table table-hover align-middle mb-0">

                        <thead>

                            <tr>

                                <th width="70">
                                    #
                                </th>

                                <th>
                                    Document Type
                                </th>

                                <th>
                                    Header
                                </th>

                                <th>
                                    Footer
                                </th>

                                <th>
                                    Terms & Conditions
                                </th>

                                <th>
                                    Payment Instructions
                                </th>

                                <th width="180">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr
                                v-for="(document, index) in documentSettings"
                                :key="document.id"
                            >

                                <!-- NUMBER -->
                                <td>

                                    <span class="row-number">
                                        {{ index + 1 }}
                                    </span>

                                </td>


                                <!-- DOCUMENT TYPE -->
                                <td>

                                    <div class="document-name">

                                        <div class="document-icon">

                                            <i
                                                :class="
                                                    document.documentType === 'INVOICE'
                                                        ? 'bi bi-receipt'
                                                        : 'bi bi-file-earmark-text'
                                                "
                                            ></i>

                                        </div>


                                        <div>

                                            <div class="document-title">

                                                {{
                                                    formatDocumentType(
                                                        document.documentType
                                                    )
                                                }}

                                            </div>

                                            <div class="document-id">

                                                ID: {{ document.id }}

                                            </div>

                                        </div>

                                    </div>

                                </td>


                                <!-- HEADER -->
                                <td>

                                    <div
                                        v-if="document.headerText"
                                        class="content-preview html-content-preview"
                                        v-html="document.headerText"
                                    ></div>

                                    <span
                                        v-else
                                        class="empty-value"
                                    >
                                        Not configured
                                    </span>

                                </td>


                                <!-- FOOTER -->
                                <td>

                                    <div
                                        v-if="document.footerText"
                                        class="content-preview html-content-preview"
                                        v-html="document.footerText"
                                    ></div>

                                    <span
                                        v-else
                                        class="empty-value"
                                    >
                                        Not configured
                                    </span>

                                </td>


                                <!-- TERMS -->
                                <td>

                                    <div
                                        v-if="document.termAndCondition"
                                        class="content-preview html-content-preview"
                                        v-html="document.termAndCondition"
                                    ></div>

                                    <span
                                        v-else
                                        class="empty-value"
                                    >
                                        Not configured
                                    </span>

                                </td>


                                <!-- PAYMENT INSTRUCTIONS -->
                                <td>

                                    <span class="instruction-count">

                                        <i class="bi bi-credit-card me-1"></i>

                                        {{
                                            document.instructions?.length || 0
                                        }}

                                        {{
                                            (document.instructions?.length || 0) === 1
                                                ? "instruction"
                                                : "instructions"
                                        }}

                                    </span>

                                </td>


                                <!-- ACTIONS -->
                                <td>

                                    <div class="action-buttons">

                                        <button
                                            v-if="canUpdate"
                                            type="button"
                                            class="btn btn-sm btn-outline-primary"
                                            title="Edit"
                                            @click="openEditModal(document)"
                                        >

                                            <i class="bi bi-pencil"></i>

                                        </button>


                                        <button
                                            v-if="canDelete"
                                            type="button"
                                            class="btn btn-sm btn-outline-danger"
                                            title="Delete"
                                            @click="confirmDelete(document)"
                                        >

                                            <i class="bi bi-trash"></i>

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>


        <!-- =====================================================
             ADD / EDIT MODAL
        ====================================================== -->
        <div
            v-if="showModal"
            class="modal-backdrop-custom"
            @click.self="closeModal"
        >

            <div class="document-modal">

                <!-- =================================================
                     MODAL HEADER
                ================================================== -->
                <div class="modal-header-custom">

                    <div class="modal-title-wrap">

                        <div class="modal-icon">

                            <i
                                :class="
                                    isEditMode
                                        ? 'bi bi-pencil-square'
                                        : 'bi bi-file-earmark-plus'
                                "
                            ></i>

                        </div>


                        <div>

                            <h5>

                                {{
                                    isEditMode
                                        ? "Edit Document Settings"
                                        : "Add Document Settings"
                                }}

                            </h5>

                            <p>

                                {{
                                    isEditMode
                                        ? "Update document configuration"
                                        : "Configure quotation or invoice"
                                }}

                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="modal-close-btn"
                        @click="closeModal"
                    >

                        <i class="bi bi-x-lg"></i>

                    </button>

                </div>


                <!-- =================================================
                     MODAL BODY
                ================================================== -->
                <div class="modal-body-custom">


                    <!-- =================================================
                         DOCUMENT TYPE
                    ================================================== -->
                    <div class="form-group">

                        <label class="form-label">

                            Document Type

                            <span class="required-star">
                                *
                            </span>

                        </label>


                        <select
                            v-model="form.documentType"
                            class="form-select"
                            :class="{
                                'is-invalid':
                                    submitted && !form.documentType
                            }"
                        >

                            <option value="">
                                Select document type
                            </option>

                            <option value="QUOTATION">
                                Quotation
                            </option>

                            <option value="INVOICE">
                                Invoice
                            </option>

                        </select>


                        <div
                            v-if="submitted && !form.documentType"
                            class="invalid-feedback"
                        >
                            Document type is required.
                        </div>

                    </div>


                    <!-- =================================================
                         HEADER HTML EDITOR
                    ================================================== -->
                    <div class="form-group">

                        <label class="form-label">

                            Header

                        </label>


                        <div class="html-editor-wrapper">

                            <QuillEditor
                                v-model:content="form.headerText"
                                content-type="html"
                                theme="snow"
                                :toolbar="editorToolbar"
                                :options="editorOptions"
                                class="document-html-editor header-editor"
                            />

                        </div>


                        <div class="field-help">

                            Create your document header using HTML formatting.
                            You can center your company name, change font size,
                            add colors, images, links, etc.

                        </div>

                    </div>


                    <!-- =================================================
                         FOOTER HTML EDITOR
                    ================================================== -->
                    <div class="form-group">

                        <label class="form-label">

                            Footer

                        </label>


                        <div class="html-editor-wrapper">

                            <QuillEditor
                                v-model:content="form.footerText"
                                content-type="html"
                                theme="snow"
                                :toolbar="editorToolbar"
                                :options="editorOptions"
                                class="document-html-editor footer-editor"
                            />

                        </div>


                        <div class="field-help">

                            Create your document footer. Use alignment,
                            formatting, links, colors and other options.

                        </div>

                    </div>


                    <!-- =================================================
                         TERMS AND CONDITIONS
                    ================================================== -->
                    <div class="form-group">

                        <label class="form-label">

                            Terms & Conditions

                        </label>


                        <div class="html-editor-wrapper">

                            <QuillEditor
                                v-model:content="form.termAndCondition"
                                content-type="html"
                                theme="snow"
                                :toolbar="editorToolbar"
                                :options="editorOptions"
                                class="document-html-editor terms-editor"
                            />

                        </div>


                        <div class="field-help">

                            Add formatted terms and conditions,
                            numbered lists, bullet lists, headings,
                            bold text and more.

                        </div>

                    </div>


                    <!-- =================================================
                         PAYMENT INSTRUCTIONS
                    ================================================== -->
                    <div class="payment-section">

                        <div class="payment-section-header">

                            <div>

                                <label class="form-label mb-0">

                                    Payment Instructions

                                </label>


                                <div class="field-help">

                                    Add one or more formatted payment
                                    instructions.

                                </div>

                            </div>


                            <button
                                type="button"
                                class="btn btn-outline-primary btn-sm"
                                @click="addInstruction"
                            >

                                <i class="bi bi-plus-lg me-1"></i>

                                Add

                            </button>

                        </div>


                        <!-- PAYMENT INSTRUCTION LIST -->
                        <div
                            v-if="form.instructions.length > 0"
                            class="instruction-list"
                        >

                            <div
                                v-for="(instruction, index) in form.instructions"
                                :key="index"
                                class="instruction-item"
                            >

                                <div class="instruction-number">

                                    {{ index + 1 }}

                                </div>


                                <div class="instruction-input">

                                    <QuillEditor
                                        v-model:content="
                                            instruction.paymentInstructions
                                        "
                                        content-type="html"
                                        theme="snow"
                                        :toolbar="editorToolbar"
                                        :options="{
                                            ...editorOptions,
                                            placeholder:
                                                `Enter payment instruction ${index + 1}`
                                        }"
                                        class="document-html-editor payment-editor"
                                    />

                                </div>


                                <button
                                    type="button"
                                    class="instruction-remove"
                                    title="Remove"
                                    @click="removeInstruction(index)"
                                >

                                    <i class="bi bi-trash"></i>

                                </button>

                            </div>

                        </div>


                        <!-- NO INSTRUCTION -->
                        <div
                            v-else
                            class="no-instructions"
                        >

                            <i class="bi bi-credit-card"></i>

                            <span>
                                No payment instructions added.
                            </span>

                        </div>

                    </div>

                </div>


                <!-- =================================================
                     MODAL FOOTER
                ================================================== -->
                <div class="modal-footer-custom">

                    <button
                        type="button"
                        class="btn btn-light"
                        :disabled="saving"
                        @click="closeModal"
                    >

                        Cancel

                    </button>


                    <button
                        type="button"
                        class="btn btn-primary"
                        :disabled="saving"
                        @click="saveDocument"
                    >

                        <span
                            v-if="saving"
                            class="spinner-border spinner-border-sm me-2"
                        ></span>


                        <i
                            v-else
                            :class="
                                isEditMode
                                    ? 'bi bi-check-lg me-1'
                                    : 'bi bi-plus-lg me-1'
                            "
                        ></i>


                        {{
                            saving
                                ? "Saving..."
                                : isEditMode
                                    ? "Update Settings"
                                    : "Save Settings"
                        }}

                    </button>

                </div>

            </div>

        </div>


        <!-- =====================================================
             DELETE MODAL
        ====================================================== -->
        <div
            v-if="showDeleteModal"
            class="modal-backdrop-custom"
            @click.self="closeDeleteModal"
        >

            <div class="delete-modal">

                <div class="delete-icon">

                    <i class="bi bi-trash"></i>

                </div>


                <h5>
                    Delete Document Settings?
                </h5>


                <p>

                    Are you sure you want to delete

                    <strong>
                        {{
                            formatDocumentType(
                                selectedDocument?.documentType
                            )
                        }}
                    </strong>

                    settings?

                </p>


                <p class="delete-warning">

                    This action cannot be undone.

                </p>


                <div class="delete-actions">

                    <button
                        type="button"
                        class="btn btn-light"
                        :disabled="deleting"
                        @click="closeDeleteModal"
                    >

                        Cancel

                    </button>


                    <button
                        type="button"
                        class="btn btn-danger"
                        :disabled="deleting"
                        @click="deleteDocument"
                    >

                        <span
                            v-if="deleting"
                            class="spinner-border spinner-border-sm me-2"
                        ></span>


                        <i
                            v-else
                            class="bi bi-trash me-1"
                        ></i>


                        {{
                            deleting
                                ? "Deleting..."
                                : "Delete"
                        }}

                    </button>

                </div>

            </div>

        </div>

    </div>
</template>


<script setup>

import {
    computed,
    onMounted,
    ref
} from "vue";


import {
    QuillEditor
} from "@vueup/vue-quill";

import "@vueup/vue-quill/dist/vue-quill.snow.css";


import {
    getDocumentSettings,
    createDocumentSettings,
    updateDocumentSettings,
    deleteDocumentSettings
} from "@/api/CompanyInfoApis/documentSetting.api.js";


import {
    hasPermission
} from "@/utils/permission.js";


// =====================================================
// STATE
// =====================================================

const documentSettings = ref([]);

const loading = ref(false);
const saving = ref(false);
const deleting = ref(false);

const errorMessage = ref("");

const showModal = ref(false);
const showDeleteModal = ref(false);

const isEditMode = ref(false);

const selectedDocument = ref(null);

const submitted = ref(false);


// =====================================================
// FORM
// =====================================================

const form = ref({

    id: null,

    documentType: "",

    headerText: "",

    footerText: "",

    termAndCondition: "",

    instructions: []

});


// =====================================================
// PERMISSIONS
// =====================================================

const canCreate = computed(() =>
    hasPermission("DOCUMENT_SETTING_CREATE")
);


const canUpdate = computed(() =>
    hasPermission("DOCUMENT_SETTING_UPDATE")
);


const canDelete = computed(() =>
    hasPermission("DOCUMENT_SETTING_DELETE")
);


// =====================================================
// QUILL TOOLBAR
// =====================================================

const editorToolbar = [

    [
        {
            header: [
                1,
                2,
                3,
                4,
                5,
                6,
                false
            ]
        }
    ],

    [
        "bold",
        "italic",
        "underline",
        "strike"
    ],

    [
        {
            color: []
        },

        {
            background: []
        }
    ],

    [
        {
            size: [
                "small",
                false,
                "large",
                "huge"
            ]
        }
    ],

    [
        {
            align: []
        }
    ],

    [
        {
            list: "ordered"
        },

        {
            list: "bullet"
        }
    ],

    [
        {
            indent: "-1"
        },

        {
            indent: "+1"
        }
    ],

    [
        "blockquote",
        "code-block"
    ],

    [
        "link",
        "image",
        "video"
    ],

    [
        "clean"
    ]

];


// =====================================================
// EDITOR OPTIONS
// =====================================================

const editorOptions = {

    modules: {
        toolbar: editorToolbar
    },

    theme: "snow",

    placeholder:
        "Write your document content here..."

};


// =====================================================
// RESET FORM
// =====================================================

const resetForm = () => {

    form.value = {

        id: null,

        documentType: "",

        headerText: "",

        footerText: "",

        termAndCondition: "",

        instructions: []

    };

    submitted.value = false;

};


// =====================================================
// FORMAT DOCUMENT TYPE
// =====================================================

const formatDocumentType = (type) => {

    if (!type) {
        return "Unknown";
    }


    switch (type) {

        case "QUOTATION":
            return "Quotation";

        case "INVOICE":
            return "Invoice";

        default:
            return type;

    }

};


// =====================================================
// LOAD DOCUMENT SETTINGS
// =====================================================

const loadDocumentSettings = async () => {

    loading.value = true;

    errorMessage.value = "";


    try {

        const response =
            await getDocumentSettings();


        documentSettings.value =
            Array.isArray(response.data)
                ? response.data
                : [];

    } catch (error) {

        console.error(
            "Error loading document settings:",
            error
        );


        errorMessage.value =
            error.response?.data?.message ||
            "Failed to load document settings.";

    } finally {

        loading.value = false;

    }

};


// =====================================================
// OPEN ADD MODAL
// =====================================================

const openAddModal = () => {

    resetForm();

    isEditMode.value = false;

    showModal.value = true;

};


// =====================================================
// OPEN EDIT MODAL
// =====================================================

const openEditModal = (document) => {

    resetForm();

    isEditMode.value = true;


    form.value = {

        id: document.id,

        documentType:
            document.documentType || "",

        headerText:
            document.headerText || "",

        footerText:
            document.footerText || "",

        termAndCondition:
            document.termAndCondition || "",

        instructions:
            Array.isArray(document.instructions)

                ? document.instructions.map(
                    instruction => ({

                        paymentInstructions:
                            instruction.paymentInstructions || ""

                    })
                )

                : []

    };


    showModal.value = true;

};


// =====================================================
// CLOSE MODAL
// =====================================================

const closeModal = () => {

    if (saving.value) {
        return;
    }


    showModal.value = false;

    resetForm();

};


// =====================================================
// ADD PAYMENT INSTRUCTION
// =====================================================

const addInstruction = () => {

    form.value.instructions.push({

        paymentInstructions: ""

    });

};


// =====================================================
// REMOVE PAYMENT INSTRUCTION
// =====================================================

const removeInstruction = (index) => {

    form.value.instructions.splice(
        index,
        1
    );

};


// =====================================================
// REMOVE EMPTY HTML
// =====================================================

const hasHtmlContent = (html) => {

    if (!html) {
        return false;
    }


    const text =
        html
            .replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .trim();


    return text.length > 0;

};


// =====================================================
// SAVE DOCUMENT
// =====================================================

const saveDocument = async () => {

    submitted.value = true;

    errorMessage.value = "";


    if (!form.value.documentType) {
        return;
    }


    saving.value = true;


    try {

        const payload = {

            documentType:
                form.value.documentType,


            headerText:
                hasHtmlContent(form.value.headerText)
                    ? form.value.headerText
                    : null,


            footerText:
                hasHtmlContent(form.value.footerText)
                    ? form.value.footerText
                    : null,


            termAndCondition:
                hasHtmlContent(form.value.termAndCondition)
                    ? form.value.termAndCondition
                    : null,


            instructions:
                form.value.instructions

                    .filter(
                        instruction =>
                            hasHtmlContent(
                                instruction.paymentInstructions
                            )
                    )

                    .map(
                        instruction => ({

                            paymentInstructions:
                                instruction.paymentInstructions

                        })
                    )

        };


        // =================================================
        // UPDATE
        // =================================================

        if (isEditMode.value) {

            await updateDocumentSettings(
                form.value.id,
                payload
            );

        }


        // =================================================
        // CREATE
        // =================================================
        else {

            await createDocumentSettings(
                payload
            );

        }


        showModal.value = false;

        resetForm();

        await loadDocumentSettings();

    } catch (error) {

        console.error(
            "Error saving document settings:",
            error
        );


        errorMessage.value =
            error.response?.data?.message ||
            "Failed to save document settings.";

    } finally {

        saving.value = false;

    }

};


// =====================================================
// OPEN DELETE MODAL
// =====================================================

const confirmDelete = (document) => {

    selectedDocument.value =
        document;

    showDeleteModal.value = true;

};


// =====================================================
// CLOSE DELETE MODAL
// =====================================================

const closeDeleteModal = () => {

    if (deleting.value) {
        return;
    }


    showDeleteModal.value = false;

    selectedDocument.value = null;

};


// =====================================================
// DELETE DOCUMENT
// =====================================================

const deleteDocument = async () => {

    if (!selectedDocument.value) {
        return;
    }


    deleting.value = true;

    errorMessage.value = "";


    try {

        await deleteDocumentSettings(
            selectedDocument.value.id
        );


        closeDeleteModal();

        await loadDocumentSettings();

    } catch (error) {

        console.error(
            "Error deleting document settings:",
            error
        );


        errorMessage.value =
            error.response?.data?.message ||
            "Failed to delete document settings.";

    } finally {

        deleting.value = false;

    }

};


// =====================================================
// INITIAL LOAD
// =====================================================

onMounted(() => {

    loadDocumentSettings();

});

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.document-settings {

    padding: 24px;

}


/* =====================================================
   PAGE HEADER
===================================================== */

.page-header {

    margin-bottom: 24px;

}


.page-header-content {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

}


.page-title-wrap {

    display: flex;

    align-items: center;

    gap: 14px;

}


.page-title-icon {

    width: 46px;
    height: 46px;

    display: flex;

    align-items: center;
    justify-content: center;

    background:
        var(--color-primary, #1b5e8c);

    color: #fff;

    border-radius: 10px;

    font-size: 21px;

}


.page-title {

    margin: 0;

    font-size: 23px;

    font-weight: 700;

    color:
        var(--color-heading, #0b1726);

}


.page-subtitle {

    margin: 4px 0 0;

    color: #7a8794;

    font-size: 14px;

}


/* =====================================================
   ADD BUTTON
===================================================== */

.add-document-btn {

    display: flex;

    align-items: center;

    gap: 7px;

    padding: 9px 16px;

    border-radius: 7px;

}


/* =====================================================
   CARD
===================================================== */

.document-setting-card {

    border: 1px solid #e5e9ed;

    border-radius: 10px;

    overflow: hidden;

    background: #fff;

    box-shadow:
        0 2px 8px rgba(15, 23, 42, 0.04);

}


.document-setting-card-header {

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding: 17px 20px;

    background: #fff;

    border-bottom:
        1px solid #e9edf1;

}


.document-setting-card-title {

    margin: 0;

    color: #0b1726;

    font-size: 16px;

    font-weight: 700;

}


.document-setting-card-count {

    display: block;

    margin-top: 3px;

    color: #8a96a3;

    font-size: 13px;

}


.refresh-btn {

    display: flex;

    align-items: center;

    gap: 6px;

    border:
        1px solid #e0e5e9;

    color: #5e6b78;

}


.refresh-btn:hover {

    background: #f6f8fa;

}


/* =====================================================
   TABLE
===================================================== */

.table {

    margin: 0;

}


.table thead th {

    padding: 13px 18px;

    background: #f8fafb;

    color: #6b7785;

    font-size: 12px;

    font-weight: 700;

    text-transform: uppercase;

    letter-spacing: 0.3px;

    border-bottom:
        1px solid #e6ebef;

    white-space: nowrap;

}


.table tbody td {

    padding: 14px 18px;

    color: #344150;

    border-color: #edf0f3;

    font-size: 14px;

    vertical-align: middle;

}


.table tbody tr:last-child td {

    border-bottom: 0;

}


.row-number {

    color: #9aa5b1;

    font-size: 13px;

}


/* =====================================================
   DOCUMENT NAME
===================================================== */

.document-name {

    display: flex;

    align-items: center;

    gap: 11px;

}


.document-icon {

    width: 38px;
    height: 38px;

    flex-shrink: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 8px;

    background: #f0f6fa;

    color: #1b5e8c;

    font-size: 17px;

}


.document-title {

    color: #172332;

    font-weight: 600;

}


.document-id {

    margin-top: 2px;

    color: #9aa5b1;

    font-size: 11px;

}


/* =====================================================
   CONTENT PREVIEW
===================================================== */

.content-preview {

    max-width: 210px;

    color: #566372;

    font-size: 13px;

    line-height: 1.5;

}


.html-content-preview {

    max-height: 82px;

    overflow: hidden;

    word-break: break-word;

}


.html-content-preview :deep(p) {

    margin: 0 0 4px;

}


.html-content-preview :deep(h1),
.html-content-preview :deep(h2),
.html-content-preview :deep(h3),
.html-content-preview :deep(h4) {

    margin: 0 0 4px;

}


.html-content-preview :deep(ol),
.html-content-preview :deep(ul) {

    margin: 0;

    padding-left: 18px;

}


.html-content-preview :deep(img) {

    max-width: 100%;

    height: auto;

}


.empty-value {

    color: #a1aab3;

    font-size: 12px;

    font-style: italic;

}


/* =====================================================
   PAYMENT INSTRUCTION COUNT
===================================================== */

.instruction-count {

    display: inline-flex;

    align-items: center;

    padding: 5px 9px;

    background: #f4f6f8;

    color: #566372;

    border-radius: 5px;

    font-size: 12px;

    font-weight: 600;

}


/* =====================================================
   ACTIONS
===================================================== */

.action-buttons {

    display: flex;

    align-items: center;

    gap: 7px;

}


.action-buttons .btn {

    width: 34px;
    height: 32px;

    display: flex;

    align-items: center;
    justify-content: center;

    padding: 0;

    border-radius: 6px;

}


/* =====================================================
   TABLE STATE
===================================================== */

.table-state {

    min-height: 280px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    padding: 40px;

    text-align: center;

    color: #7c8894;

}


.table-state p {

    margin: 10px 0 18px;

    font-size: 14px;

}


.table-state h6 {

    margin: 14px 0 0;

    color: #263443;

    font-size: 15px;

}


.empty-icon {

    width: 58px;
    height: 58px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: #f2f6f9;

    border-radius: 50%;

    color: #7890a3;

    font-size: 25px;

}


/* =====================================================
   MODAL BACKDROP
===================================================== */

.modal-backdrop-custom {

    position: fixed;

    inset: 0;

    z-index: 1050;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 20px;

    background:
        rgba(11, 23, 38, 0.48);

    backdrop-filter: blur(2px);

    overflow-y: auto;

}


/* =====================================================
   DOCUMENT MODAL
===================================================== */

.document-modal {

    width: 100%;

    max-width: 850px;

    max-height:
        calc(100vh - 40px);

    display: flex;

    flex-direction: column;

    background: #fff;

    border-radius: 12px;

    overflow: hidden;

    box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.18);

}


/* =====================================================
   MODAL HEADER
===================================================== */

.modal-header-custom {

    flex-shrink: 0;

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding: 18px 20px;

    border-bottom:
        1px solid #e9edf1;

}


.modal-title-wrap {

    display: flex;

    align-items: center;

    gap: 12px;

}


.modal-icon {

    width: 40px;
    height: 40px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: #edf5fa;

    color: #1b5e8c;

    border-radius: 8px;

    font-size: 18px;

}


.modal-title-wrap h5 {

    margin: 0;

    color: #152332;

    font-size: 17px;

    font-weight: 700;

}


.modal-title-wrap p {

    margin: 3px 0 0;

    color: #8a96a3;

    font-size: 12px;

}


.modal-close-btn {

    width: 34px;
    height: 34px;

    display: flex;

    align-items: center;
    justify-content: center;

    border: 0;

    background: transparent;

    color: #7d8995;

    border-radius: 6px;

}


.modal-close-btn:hover {

    background: #f2f4f6;

    color: #263443;

}


/* =====================================================
   MODAL BODY
===================================================== */

.modal-body-custom {

    padding: 22px 20px;

    overflow-y: auto;

}


.form-group {

    margin-bottom: 22px;

}


.form-label {

    display: block;

    margin-bottom: 7px;

    color: #344150;

    font-size: 13px;

    font-weight: 600;

}


.required-star {

    color: #dc3545;

}


.form-control,
.form-select {

    border-color: #dce2e7;

    border-radius: 7px;

    font-size: 14px;

}


.form-control:focus,
.form-select:focus {

    border-color: #1b5e8c;

    box-shadow:
        0 0 0 3px rgba(27, 94, 140, 0.10);

}


.field-help {

    margin-top: 6px;

    color: #8a96a3;

    font-size: 11px;

    line-height: 1.5;

}


/* =====================================================
   HTML EDITOR
===================================================== */

.html-editor-wrapper {

    width: 100%;

    border:
        1px solid #dce2e7;

    border-radius: 8px;

    overflow: hidden;

    background: #fff;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

}


.html-editor-wrapper:focus-within {

    border-color: #1b5e8c;

    box-shadow:
        0 0 0 3px rgba(27, 94, 140, 0.10);

}


.document-html-editor {

    width: 100%;

}


/* =====================================================
   QUILL TOOLBAR
===================================================== */

.document-html-editor :deep(.ql-toolbar) {

    display: flex;

    flex-wrap: wrap;

    align-items: center;

    gap: 2px;

    padding: 8px;

    background: #f8fafb;

    border: 0;

    border-bottom:
        1px solid #e4e8ec;

}


.document-html-editor :deep(.ql-toolbar button) {

    width: 28px;
    height: 28px;

    border-radius: 5px;

}


.document-html-editor :deep(.ql-toolbar button:hover) {

    background: #e8f1f6;

}


.document-html-editor :deep(.ql-toolbar button.ql-active) {

    background: #dcecf5;

}


/* =====================================================
   QUILL SELECT
===================================================== */

.document-html-editor :deep(.ql-toolbar .ql-picker) {

    font-size: 12px;

}


.document-html-editor :deep(.ql-toolbar .ql-picker-label) {

    border-radius: 5px;

}


.document-html-editor :deep(.ql-toolbar .ql-picker-label:hover) {

    background: #e8f1f6;

}


/* =====================================================
   QUILL CONTAINER
===================================================== */

.document-html-editor :deep(.ql-container) {

    border: 0;

    font-family:
        Inter,
        Arial,
        sans-serif;

    font-size: 14px;

    color: #344150;

}


.document-html-editor :deep(.ql-editor) {

    min-height: 170px;

    padding: 14px 15px;

    line-height: 1.6;

}


.document-html-editor :deep(.ql-editor.ql-blank::before) {

    left: 15px;

    color: #a2acb6;

    font-style: normal;

    font-size: 13px;

}


/* =====================================================
   HEADER EDITOR
===================================================== */

.header-editor :deep(.ql-editor) {

    min-height: 180px;

}


/* =====================================================
   FOOTER EDITOR
===================================================== */

.footer-editor :deep(.ql-editor) {

    min-height: 150px;

}


/* =====================================================
   TERMS EDITOR
===================================================== */

.terms-editor :deep(.ql-editor) {

    min-height: 220px;

}


/* =====================================================
   PAYMENT EDITOR
===================================================== */

.payment-editor :deep(.ql-editor) {

    min-height: 130px;

}


/* =====================================================
   EDITOR CONTENT
===================================================== */

.document-html-editor :deep(.ql-editor h1),
.document-html-editor :deep(.ql-editor h2),
.document-html-editor :deep(.ql-editor h3),
.document-html-editor :deep(.ql-editor h4) {

    margin-top: 8px;

    margin-bottom: 8px;

    color: #0b1726;

    font-weight: 700;

}


.document-html-editor :deep(.ql-editor p) {

    margin-bottom: 7px;

}


.document-html-editor :deep(.ql-editor ul),
.document-html-editor :deep(.ql-editor ol) {

    padding-left: 25px;

    margin-bottom: 10px;

}


.document-html-editor :deep(.ql-editor a) {

    color: #1b5e8c;

    text-decoration: underline;

}


/* =====================================================
   PAYMENT SECTION
===================================================== */

.payment-section {

    margin-top: 5px;

    padding: 16px;

    background: #f7f9fa;

    border:
        1px solid #e6eaed;

    border-radius: 9px;

}


.payment-section-header {

    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    gap: 15px;

    margin-bottom: 14px;

}


.payment-section-header .form-label {

    margin-bottom: 0;

}


/* =====================================================
   INSTRUCTION LIST
===================================================== */

.instruction-list {

    display: flex;

    flex-direction: column;

    gap: 12px;

}


.instruction-item {

    display: flex;

    align-items: flex-start;

    gap: 9px;

    padding: 10px;

    background: #fff;

    border:
        1px solid #e0e5e9;

    border-radius: 7px;

}


.instruction-number {

    width: 27px;
    height: 27px;

    flex-shrink: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    background: #edf5fa;

    color: #1b5e8c;

    border-radius: 6px;

    font-size: 12px;

    font-weight: 700;

}


.instruction-input {

    flex: 1;

    min-width: 0;

}


.instruction-remove {

    width: 30px;
    height: 30px;

    flex-shrink: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    border:
        1px solid #f0d4d4;

    background: #fff;

    color: #dc3545;

    border-radius: 6px;

    cursor: pointer;

}


.instruction-remove:hover {

    background: #fff1f1;

    border-color: #dc3545;

}


/* =====================================================
   NO INSTRUCTIONS
===================================================== */

.no-instructions {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    min-height: 70px;

    background: #fff;

    border:
        1px dashed #d8dfe4;

    border-radius: 7px;

    color: #8a96a3;

    font-size: 12px;

}


.no-instructions i {

    font-size: 16px;

}


/* =====================================================
   MODAL FOOTER
===================================================== */

.modal-footer-custom {

    flex-shrink: 0;

    display: flex;

    justify-content: flex-end;

    gap: 9px;

    padding: 15px 20px;

    border-top:
        1px solid #e9edf1;

    background: #fafbfc;

}


.modal-footer-custom .btn {

    min-width: 110px;

}


/* =====================================================
   DELETE MODAL
===================================================== */

.delete-modal {

    width: 100%;

    max-width: 410px;

    padding: 28px;

    text-align: center;

    background: #fff;

    border-radius: 12px;

    box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.18);

}


.delete-icon {

    width: 56px;
    height: 56px;

    margin: 0 auto 15px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: #fff0f0;

    color: #dc3545;

    border-radius: 50%;

    font-size: 22px;

}


.delete-modal h5 {

    margin: 0;

    color: #182533;

    font-size: 18px;

    font-weight: 700;

}


.delete-modal p {

    margin: 10px 0 0;

    color: #6f7b87;

    font-size: 14px;

    line-height: 1.6;

}


.delete-warning {

    font-size: 12px !important;

    color: #a0a8b0 !important;

}


.delete-actions {

    display: flex;

    justify-content: center;

    gap: 10px;

    margin-top: 22px;

}


.delete-actions .btn {

    min-width: 100px;

}


/* =====================================================
   LOADING SPINNER
===================================================== */

.spin {

    animation:
        spin 0.8s linear infinite;

}


@keyframes spin {

    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 768px) {

    .document-settings {

        padding: 15px;

    }


    .page-header-content {

        align-items: flex-start;

        flex-direction: column;

    }


    .add-document-btn {

        width: 100%;

        justify-content: center;

    }


    .document-setting-card-header {

        align-items: flex-start;

        gap: 12px;

    }


    .refresh-btn {

        flex-shrink: 0;

    }


    .table {

        min-width: 1100px;

    }


    .modal-backdrop-custom {

        align-items: flex-start;

        padding-top: 15px;

        padding-bottom: 15px;

    }


    .document-modal {

        max-height:
            calc(100vh - 30px);

    }


    .payment-section-header {

        align-items: stretch;

        flex-direction: column;

    }


    .payment-section-header .btn {

        width: 100%;

    }


    .instruction-item {

        flex-wrap: wrap;

    }


    .instruction-input {

        flex-basis: calc(100% - 45px);

    }


    .instruction-remove {

        margin-left: auto;

    }

}

</style>