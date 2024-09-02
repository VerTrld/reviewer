"use client";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Button, Flex, Input } from "@mantine/core";
import { InferType, array, mixed, object, string } from "yup";
import { useForm, yupResolver } from "@mantine/form";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconHomeFilled } from "@tabler/icons-react";

const EditPage = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const schema = object({
    title: string().required(),
    content: string().required(),
  });

  type IInput = InferType<typeof schema>;

  const form = useForm<IInput>({
    validate: yupResolver(schema),
    initialValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        form.setFieldValue("content", editor.getHTML());
      });
    }
  }, [editor, form]);

  const { push } = useRouter();

  const handleSubmit = form.onSubmit(async (values) => {
    console.log({ values });
    try {
      await axios.post("/api/user", values);
      alert("Review saved successfully!");
    } catch (error) {
      console.error("Failed to save review:", error);
      alert("Failed to save review.");
    } finally {
      editor?.commands.setContent("");
      form.reset();
    }
  });

  return (
    <Flex direction={"column"} w={"100%"} h={"100vh"} bg={"#F3F9D2"}>
      <form onSubmit={handleSubmit}>
        <RichTextEditor editor={editor}>
          <Flex direction={"row"} w={"100%"} justify={"start"} p={10} gap={10}>
            <Button
              bg={"#92B4A7"}
              onClick={() => {
                push("/");
              }}
            >
              <IconHomeFilled />
            </Button>
            <Button bg={"#92B4A7"} type="submit">
              Save
            </Button>
            <Input placeholder="Title" {...form.getInputProps("title")} />
          </Flex>
          <RichTextEditor.Toolbar
            sticky
            bg={"#92B4A7"}
            style={{ justifyContent: "center" }}
          >
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content
            style={{
              minHeight: "70vh",
              border: "2px solid gray",
              backgroundColor: "white", // Ensure the background is white
            }}
          />
        </RichTextEditor>
      </form>
    </Flex>
  );
};

export default EditPage;
