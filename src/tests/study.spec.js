import { describe, it, expect, beforeEach } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { supabase } from "../utils/supabase";

const TABLE_NAME = "study-record";

beforeEach(async () => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .not("id", "is", null);
  if (error) {
    console.error("DB初期化エラー", error.message);
  }
});

describe("Study Test", () => {
  it("タイトルが表示されている", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("title")).toBeInTheDocument();
    });
    render(<App />);
    expect(screen.getByTestId("title")).toHaveTextContent("学習記録一覧");
  });

  it("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている 数が1つ増えていることをテストする", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("input-title")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("input-title"), {
      target: { value: "React" },
    });
    fireEvent.change(screen.getByTestId("input-time"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByTestId("add-button"));
    await waitFor(() => {
      expect(screen.getByTestId("record-item")).toBeInTheDocument();
    });
    expect(screen.getByTestId("record-item")).toHaveTextContent("React 2時間");
  });

  it("削除ボタンを押すと学習記録が削除される 数が1つ減っていることをテストする", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("title")).toBeInTheDocument();
    });
    // 学習内容と時間を入力して登録ボタンを押す
    fireEvent.change(screen.getByTestId("input-title"), {
      target: { value: "React" },
    });
    fireEvent.change(screen.getByTestId("input-time"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByTestId("add-button"));
    const addedItem = await screen.findByTestId(
      "record-item",
      {},
      { timeout: 8000 }
    );
    expect(addedItem).toHaveTextContent("React 2時間");

    // 削除ボタンを押す
    fireEvent.click(screen.getByTestId("delete-button"));
    await waitFor(() => {
      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });

    // Reactの文字が表示されていないことをテストする
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("入力をしないで登録を押すとエラーが表示される", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("add-button")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "入力されていない項目があります"
    );
  });
});
