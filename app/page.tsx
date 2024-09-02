"use client";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { InferType, object, string } from "yup";
import { useForm, yupResolver } from "@mantine/form";

import React from "react";

export default function Home() {
  const schema = object({
    username: string().required(),
    password: string().required(),
  });

  type IInput = InferType<typeof schema>;

  const form = useForm<IInput>({
    validate: yupResolver(schema),
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    console.log({ values });
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container size={420} my={40}>
          <Title ta="center">Welcome back!</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{" "}
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </Paper>
        </Container>
      </form>
    </>
  );
}
