import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

const RTE = function RTE({ label, defaultValue = "", control, name }) {
  return (
    <div className="w-full pt-4 block">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            init={{
              plugins: [
                // Core editing features
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
                // Your account includes a free trial of TinyMCE premium features
                // Try the most popular premium features until Nov 12, 2024:
              
               
              ],
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
              exportpdf_converter_options: {
                format: "Letter",
                margin_top: "1in",
                margin_right: "1in",
                margin_bottom: "1in",
                margin_left: "1in",
              },
              exportword_converter_options: { document: { size: "Letter" } },
              importword_converter_options: {
                formatting: {
                  styles: "inline",
                  resets: "inline",
                  defaults: "inline",
                },
              },
            }}
            onEditorChange={onChange}
          />
        )}
      ></Controller>
    </div>
  );
}

export default RTE;
