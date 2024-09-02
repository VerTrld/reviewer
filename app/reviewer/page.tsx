"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Input,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  IconIdBadge,
  IconPencil,
  IconTrash,
  IconTrashFilled,
} from "@tabler/icons-react";

interface Review {
  reviews: [
    {
      id: string;
      title: string;
      content: string;
    }
  ];
}

export default function Reviwer() {
  const { push } = useRouter();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios.get<Review>("/api/user");
      return data;
    },
  });

  const deleteSubmit = async (id: string) => {
    try {
      await axios.delete(`/api/user?id=${id}`);
      refetch();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  return (
    <>
      <Flex
        direction={"column"}
        w={"100%"}
        mih={"100vh"}
        bg={"#F3F9D2"}
        justify={"center"}
        gap={10}
        p={10}
      >
        <Button bg={"#92B4A7"} onClick={() => push("/editor")} p={10}>
          Add Reviewer
        </Button>
        <Input placeholder="search" />

        <Box
          p={10}
          style={{ display: "flex", flex: 1, justifyContent: "center" }}
        >
          <Group justify="center">
            {data?.reviews.map((review, index) => (
              <>
                <Card
                  bg={"#92B4A7"}
                  shadow="sm"
                  padding="sm"
                  w={150}
                  h={200}
                  // style={{ border: "2px solid" }}
                >
                  <Stack justify="space-between" flex={1} gap={0}>
                    <Flex direction={"row"} justify={"end"}>
                      <IconTrashFilled
                        color="#BA1B1D"
                        cursor={"pointer"}
                        onClick={() => deleteSubmit(review.id)}
                      />
                    </Flex>
                    <Text
                      fw={500}
                      size="lg"
                      mt="md"
                      ta={"center"}
                      truncate={"end"}
                    >
                      {review.title}
                    </Text>

                    <Group gap={0} justify="space-between">
                      <Button
                        bg={"#2F2F2F"}
                        flex={1}
                        size="xs"
                        onClick={() => {
                          push(`/content?id=${review.id}`);
                        }}
                      >
                        Read
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              </>
            ))}
          </Group>
        </Box>
      </Flex>
    </>
  );
}
