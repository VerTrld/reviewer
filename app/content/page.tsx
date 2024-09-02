"use client";

import { Suspense } from "react";
import { Flex, Paper, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface Review {
  reviews: [
    {
      id: string;
      title: string;
      content: string;
    }
  ];
}

function Content() {
  const searchparams = useSearchParams();
  const id = searchparams.get("id");
  const { data, error, isLoading } = useQuery({
    queryKey: ["id", id],
    queryFn: async () => {
      const { data } = await axios.get<Review>("/api/user");
      return data.reviews.filter((review) => review.id === id);
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
      <Flex direction={"row"} mih={"100vh"} w={"100%"} justify={"center"}>
        <Paper shadow="lg" p={10}>
          {data?.map((review, index) => (
            <>
              <Title ta={"center"}>{review.title}</Title>
              <Text>
                <div dangerouslySetInnerHTML={{ __html: review.content }} />
              </Text>
            </>
          ))}
        </Paper>
      </Flex>
    </>
  );
}

export default function ContentWrapper() {
  return (
    <Suspense fallback={<Text>Loading content...</Text>}>
      <Content />
    </Suspense>
  );
}
