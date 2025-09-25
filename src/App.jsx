import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";

function App() {
  const [titleText, setTitleText] = useState("");
  const [timeText, setTimeText] = useState(0);
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [sumTime, setSumTime] = useState();
  const isError = !titleText || !timeText;
  const [loading, setLoading] = useState(false);
  const TABLE_NAME = "study-record";

  const getRecord = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(TABLE_NAME).select();
    if (error) {
      console.error("データ取得エラー");
      return;
    }

    setRecords(data);
    setLoading(false);
  };

  useEffect(() => {
    getRecord();
  }, []);

  const changeTitleText = (e) => setTitleText(e.target.value);
  const changeTimeText = (e) => setTimeText(e.target.value);

  const addRecord = async () => {
    const displayRecord = {
      title: titleText,
      time: timeText,
    };
    if (isError) {
      setErrorMessage("入力されていない項目があります");
      return;
    }
    const { error } = await supabase.from(TABLE_NAME).insert(displayRecord);
    if (error) {
      console.error("データ追加エラー");
      return;
    }
    await getRecord();

    setTitleText("");
    setTimeText(0);
    setErrorMessage("");
  };

  const deleteTodo = async (id) => {
    console.log("id", id);
    const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
    if (error) {
      console.error("データ削除エラー");
      return;
    }
    await getRecord();
  };

  useEffect(() => {
    const timeArray = records.map((record) => record.time);

    const initialValue = 0;
    const sumStudyTime = timeArray.reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue),
      initialValue
    );
    setSumTime(sumStudyTime);
  }, [records]);

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <h1>学習記録一覧</h1>
          <div className="form">
            <div className="study-content">
              <p>学習内容</p>
              <input type="text" value={titleText} onChange={changeTitleText} />
            </div>
            <div className="study-content">
              <p>学習時間</p>
              <input type="number" value={timeText} onChange={changeTimeText} />
              <p>時間</p>
            </div>
            <button className="add-button" onClick={addRecord}>
              登録
            </button>
          </div>
          <div className="error-message"> {errorMessage}</div>
          <div>
            <p>入力されている学習内容：{titleText}</p>
            <p>学習内入力されている時間：{timeText}時間</p>
          </div>

          <div className="content-list">
            <ul>
              {records.map((record, index) => (
                <>
                  <li key={index}>{`${record.title} ${record.time}時間`}</li>
                  <button
                    onClick={() => {
                      deleteTodo(record.id);
                    }}
                  >
                    delete
                  </button>
                </>
              ))}
            </ul>
          </div>

          <p>合計時間：{sumTime}/1000</p>
        </>
      )}
    </>
  );
}

export default App;
