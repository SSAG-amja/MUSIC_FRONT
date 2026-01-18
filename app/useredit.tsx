import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// 1. TypeScript 인터페이스 정의
interface RadioButtonProps {
  label: string;
  value: string;
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function UserEditScreen() {
  const router = useRouter();

  // 기존 회원 정보가 있다고 가정 (초기값 설정)
  const [email, setEmail] = useState("user@example.com");
  const [nickname, setNickname] = useState("기존닉네임");

  // 정보 수정을 위한 현재 비밀번호 확인용 state
  const [currentPassword, setCurrentPassword] = useState("");

  const [year, setYear] = useState("1995"); // 기존 생년
  const [month, setMonth] = useState("5"); // 기존 생월
  const [day, setDay] = useState("15"); // 기존 생일
  const [gender, setGender] = useState("male"); // 기존 성별

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const list = [];
    for (let i = currentYear; i >= 1950; i--) list.push(i.toString());
    return list;
  }, []);

  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
    [],
  );
  const days = useMemo(
    () => Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    [],
  );

  const handleUpdate = () => {
    // 1. 필수 입력값 체크
    if (!nickname || !year || !month || !day || !gender) {
      Alert.alert("알림", "변경할 정보를 모두 입력해주세요.");
      return;
    }

    // 2. 비밀번호 입력 체크 (요청사항: 비밀번호를 작성해야 변경 완료)
    if (!currentPassword) {
      Alert.alert(
        "비밀번호 확인",
        "정보를 수정하려면 현재 비밀번호를 입력해야 합니다.",
      );
      return;
    }

    // TODO: 여기서 실제 서버로 현재 비밀번호가 맞는지 검증하는 로직이 필요합니다.
    // 예시: if (checkPassword(currentPassword) === false) return;

    const birthDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    console.log("회원정보 수정 요청:", {
      email,
      nickname,
      birthDate,
      gender,
      currentPassword,
    });

    Alert.alert("수정 완료", "회원정보가 성공적으로 변경되었습니다.", [
      { text: "확인", onPress: () => router.back() },
    ]);
  };

  const RadioButton = ({
    label,
    value,
    selectedValue,
    onSelect,
  }: RadioButtonProps) => (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={() => onSelect(value)}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.radioCircle,
          selectedValue === value && styles.radioCircleSelected,
        ]}
      >
        {selectedValue === value && <View style={styles.radioInnerCircle} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          title: "회원정보 수정", // 헤더 타이틀 변경
          headerBackTitle: " ",
          headerTintColor: "#FFFFFF",
          headerStyle: { backgroundColor: "#0A0A1E" },
          headerShadowVisible: false,
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>프로필 편집</Text>
            <Text style={styles.headerSubtitle}>
              등록된 정보를 변경할 수 있습니다.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            {/* 이메일 (보통 이메일은 변경 불가능한 경우가 많아 스타일을 다르게 처리하거나 readOnly로 설정) */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>이메일</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]} // 비활성화 스타일 적용
                value={email}
                editable={false} // 이메일 변경 불가 처리 (필요시 true로 변경)
              />
              <Text style={styles.helperText}>
                이메일은 변경할 수 없습니다.
              </Text>
            </View>

            {/* 닉네임 */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>닉네임</Text>
              <TextInput
                style={styles.input}
                placeholder="닉네임"
                placeholderTextColor="#888899"
                value={nickname}
                onChangeText={setNickname}
                autoCorrect={false}
              />
            </View>

            {/* 생년월일 */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>생년월일</Text>
              <View style={styles.datePickerRow}>
                {/* 년 */}
                <View style={[styles.pickerContainer, { flex: 3.8 }]}>
                  <Picker
                    selectedValue={year}
                    onValueChange={(itemValue) => setYear(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#FFFFFF"
                    mode="dropdown"
                  >
                    {years.map((y) => (
                      <Picker.Item
                        key={y}
                        label={`${y}년`}
                        value={y}
                        color="#000000"
                      />
                    ))}
                  </Picker>
                </View>

                {/* 월 */}
                <View style={[styles.pickerContainer, { flex: 3.1 }]}>
                  <Picker
                    selectedValue={month}
                    onValueChange={(itemValue) => setMonth(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#FFFFFF"
                    mode="dropdown"
                  >
                    {months.map((m) => (
                      <Picker.Item
                        key={m}
                        label={`${m}월`}
                        value={m}
                        color="#000000"
                      />
                    ))}
                  </Picker>
                </View>

                {/* 일 */}
                <View style={[styles.pickerContainer, { flex: 3.1 }]}>
                  <Picker
                    selectedValue={day}
                    onValueChange={(itemValue) => setDay(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#FFFFFF"
                    mode="dropdown"
                  >
                    {days.map((d) => (
                      <Picker.Item
                        key={d}
                        label={`${d}일`}
                        value={d}
                        color="#000000"
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            {/* 성별 */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>성별</Text>
              <View style={styles.radioGroup}>
                <RadioButton
                  label="남성"
                  value="male"
                  selectedValue={gender}
                  onSelect={setGender}
                />
                <RadioButton
                  label="여성"
                  value="female"
                  selectedValue={gender}
                  onSelect={setGender}
                />
                <RadioButton
                  label="기타"
                  value="other"
                  selectedValue={gender}
                  onSelect={setGender}
                />
              </View>
            </View>

            <View style={styles.divider} />

            {/* 중요: 수정 확인을 위한 비밀번호 입력 */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: "#8A2BE2" }]}>
                현재 비밀번호 확인
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: currentPassword ? "#8A2BE2" : "#2F2F4F" },
                ]}
                placeholder="정보를 수정하려면 비밀번호를 입력하세요"
                placeholderTextColor="#888899"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
            <Text style={styles.saveButtonText}>수정 완료</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A1E",
  },
  scrollContainer: {
    padding: 30,
    paddingTop: 10,
    paddingBottom: 50,
  },
  headerContainer: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#888899",
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 30,
    gap: 20,
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 4,
  },
  helperText: {
    fontSize: 12,
    color: "#666677",
    marginLeft: 4,
  },
  input: {
    height: 55,
    backgroundColor: "#1F1F35",
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2F2F4F",
  },
  disabledInput: {
    backgroundColor: "#151525", // 비활성화된 느낌의 더 어두운 배경
    color: "#888899",
  },
  // --- 구분선 ---
  divider: {
    height: 1,
    backgroundColor: "#2F2F4F",
    marginVertical: 10,
  },
  // --- 생년월일 스타일 ---
  datePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  pickerContainer: {
    flex: 1,
    height: 55,
    backgroundColor: "#1F1F35",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2F2F4F",
    justifyContent: "center",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1F1F35",
    color: "#FFFFFF",
    ...(Platform.OS === "android" ? {} : { height: 150, marginTop: -50 }),
  },
  // --- 성별 라디오 버튼 스타일 ---
  radioGroup: {
    flexDirection: "row",
    gap: 20,
    marginTop: 5,
    paddingLeft: 4,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#8A2BE2",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1F35",
  },
  radioCircleSelected: {
    borderColor: "#8A2BE2",
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#8A2BE2",
  },
  radioLabel: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  // --- 버튼 스타일 ---
  saveButton: {
    height: 55,
    backgroundColor: "#8A2BE2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
