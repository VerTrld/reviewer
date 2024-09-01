"use client";

import { Box, Button, Flex, Stack, Text, UnstyledButton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Review {
  reviews: [
    {
      id: string;
      title: string;
      content: string;
    }
  ];
}

export default function Home() {
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
      <Flex direction={"column"} w={"100%"} h={"100vh"}>
        <Flex
          direction={"row"}
          w={"100%"}
          h={"100%"}
          gap={20}
          justify={"center"}
        >
          <Button onClick={() => push("/editor")} p={10}>
            Add Reviewer
          </Button>
          {data?.reviews.map((review, index) => (
            <>
              <Stack>
                <Box
                  w={100}
                  h={100}
                  style={{ border: "2px solid red" }}
                  onClick={() => {
                    push(`/content?id=${review.id}`);
                  }}
                >
                  <Text ta={"center"} key={index}>
                    {review.title}
                  </Text>
                </Box>
                <UnstyledButton
                  ta={"center"}
                  onClick={() => deleteSubmit(review.id)}
                >
                  delete
                </UnstyledButton>
              </Stack>
            </>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
