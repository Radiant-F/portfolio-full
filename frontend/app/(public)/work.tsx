import {
  ButtonCustom,
  ErrorIndicator,
  LoadingIndicator,
  ModalCustom,
  Socials,
  WorkTag,
} from "@/components";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetWorksQuery } from "@/features/work";
import type { WorkResponse } from "@/features/work/work";

export default function Work() {
  const { isFetching, isError, isSuccess, refetch, data } =
    useGetWorksQuery(null);
  const [selectedWork, setSelectedWork] = useState<WorkResponse | null>(null);

  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const onNextScreenshot = () => {
    if (!selectedWork) return;
    selectedScreenshotIndex + 1 === selectedWork.screenshots.length
      ? setSelectedScreenshotIndex(0)
      : setSelectedScreenshotIndex(selectedScreenshotIndex + 1);
  };
  const onPrevScreenshot = () => {
    if (!selectedWork) return;
    selectedScreenshotIndex === 0
      ? setSelectedScreenshotIndex(selectedWork.screenshots.length - 1)
      : setSelectedScreenshotIndex(selectedScreenshotIndex - 1);
  };

  const { bottom: bottomInset } = useSafeAreaInsets();

  const [modalMounted, setModalMounted] = useState(false);

  function openModal(work: WorkResponse) {
    setModalMounted(true);
    setSelectedWork(work);
  }

  function closeModal() {
    setModalMounted(false);
    setSelectedWork(null);
    selectedScreenshotIndex !== 0 && setSelectedScreenshotIndex(0);
  }

  async function onVisit(url: string) {
    try {
      await Linking.openURL(url);
    } catch (error) {
      alert(`Cannot open url. Error detail: ${JSON.stringify(error)}`);
    }
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: bottomInset + 20,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={styles.textTitle}>
            <Text style={{ color: "rgb(158, 213, 255)" }}>Personal</Text> and{" "}
            <Text style={{ color: "rgb(158, 213, 255)" }}>team</Text>
          </Text>
          <Text style={{ color: "rgb(172, 193, 210)", textAlign: "center" }}>
            Click for more details.
          </Text>
        </View>

        <View style={styles.containerItem}>
          {isFetching && <LoadingIndicator />}
          {isError && <ErrorIndicator onPressRefresh={refetch} />}
          {isSuccess && (
            <>
              {data.map((v) => {
                return (
                  <ButtonCustom
                    key={v.id}
                    style={styles.btn}
                    onPress={() => openModal(v)}
                  >
                    <Image
                      source={{ uri: v.iconUrl }}
                      style={{ width: 125, height: 125 }}
                      resizeMethod="resize"
                      resizeMode="cover"
                    />
                    <View style={{ flex: 1, padding: 15, gap: 10 }}>
                      <Text style={styles.textWorkName} numberOfLines={1}>
                        {v.title}
                      </Text>
                      <View style={styles.viewTag}>
                        {v.tags.slice(0, 4).map((v) => {
                          return (
                            <WorkTag
                              showName={false}
                              key={v.id}
                              name={v.name}
                            />
                          );
                        })}
                        {v.tags.length > 4 && (
                          <Text style={{ color: "rgb(158, 213, 255)" }}>
                            +{v.tags.length - 4} more
                          </Text>
                        )}
                      </View>
                    </View>
                  </ButtonCustom>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>

      <ModalCustom
        visible={modalMounted}
        onClose={closeModal}
        title={selectedWork?.title ?? "Work Title"}
        customHeaderInfoStart={
          selectedWork?.iconUrl && (
            <Image
              source={{ uri: selectedWork.iconUrl }}
              style={{ width: "100%", height: "100%" }}
              resizeMethod="resize"
              resizeMode="contain"
            />
          )
        }
      >
        {selectedWork && (
          <>
            <View style={{ width: "100%", height: 280 }}>
              <Image
                source={{
                  uri: selectedWork.screenshots[selectedScreenshotIndex]
                    .imageUrl,
                }}
                style={styles.imgWorkScBackdrop}
                resizeMethod="resize"
                resizeMode="cover"
                blurRadius={5}
              />
              <Image
                source={{
                  uri: selectedWork.screenshots[selectedScreenshotIndex]
                    .imageUrl,
                }}
                style={styles.imgWorkSc}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </View>

            <View style={{ padding: 20, gap: 20 }}>
              <View style={styles.viewPagination}>
                <ButtonCustom
                  style={{ ...styles.btnPagination, paddingRight: 20 }}
                  onPress={onPrevScreenshot}
                >
                  <MCIcons
                    name="chevron-left"
                    color={"rgb(172, 193, 210)"}
                    size={25}
                  />
                  <Text
                    selectable={false}
                    style={{ color: "rgb(172, 193, 210)" }}
                  >
                    Prev
                  </Text>
                </ButtonCustom>
                <Text style={{ color: "rgb(172, 193, 210)" }}>
                  {selectedScreenshotIndex + 1}/
                  {selectedWork.screenshots.length}
                </Text>
                <ButtonCustom
                  style={{ ...styles.btnPagination, paddingLeft: 20 }}
                  onPress={onNextScreenshot}
                >
                  <Text
                    selectable={false}
                    style={{ color: "rgb(172, 193, 210)" }}
                  >
                    Next
                  </Text>
                  <MCIcons
                    name="chevron-right"
                    color={"rgb(172, 193, 210)"}
                    size={25}
                  />
                </ButtonCustom>
              </View>
              <Text style={{ color: "rgb(172, 193, 210)" }}>
                {selectedWork.description}
              </Text>

              <View style={styles.viewWorkSocial}>
                {selectedWork.links.map((v) => (
                  <ButtonCustom
                    key={v.id}
                    style={styles.btnWorkSocial}
                    onPress={() => onVisit(v.url)}
                  >
                    <Socials platform={v.platform} height={20} width={20} />
                    <Text style={{ color: "rgb(224, 242, 255)" }}>
                      {v.label}
                    </Text>
                  </ButtonCustom>
                ))}
              </View>
              <View style={styles.viewTags}>
                {selectedWork.tags.map((v) => {
                  return <WorkTag key={v.id} name={v.name} />;
                })}
              </View>
            </View>
          </>
        )}
      </ModalCustom>
    </>
  );
}

const styles = StyleSheet.create({
  viewWorkSocial: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btnWorkSocial: {
    backgroundColor: "rgb(39, 48, 58)",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 50 / 2,
    elevation: 3,
    gap: 10,
    paddingHorizontal: 20,
  },
  viewTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "center",
  },
  btnPagination: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(39, 48, 58)",
    borderRadius: 40 / 2,
    elevation: 3,
    flexDirection: "row",
    gap: 2.5,
    paddingHorizontal: 10,
  },
  viewPagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "aqua",
  },
  imgWorkScBackdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.25,
  },
  imgWorkSc: {
    width: "100%",
    height: "100%",
  },
  viewTag: {
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "tomato",
    // height: "100%",
    // flex: 1,
    gap: 5,
    alignItems: "center",
    // width: 140,
    // justifyContent: "space-evenly",
  },
  textWorkName: {
    color: "rgb(224, 242, 255)",
    fontWeight: "bold",
    // padding: 15,
  },
  btn: {
    backgroundColor: "rgb(39, 48, 58)",
    elevation: 3,
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    maxHeight: 125,
    width: 125 + 175,
  },
  containerItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  textTitle: {
    fontWeight: "bold",
    color: "rgb(224, 242, 255)",
    textAlign: "center",
    fontSize: 27,
  },
  container: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
  },
});
