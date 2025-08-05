"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, UserX, RotateCcw, Play } from "lucide-react"

// Dữ liệu trò chơi được tổ chức theo object
const gameData = {
  friends: {
    title: "Chơi với Bạn Bè",
    icon: Users,
    color: "bg-blue-500",
    questions: [
      { type: "truth", content: "Điều gì khiến bạn cảm thấy xấu hổ nhất?" },
      { type: "dare", content: "Hãy nhảy một điệu nhảy kỳ quặc trong 30 giây" },
      { type: "truth", content: "Bạn đã từng nói dối bạn thân về điều gì?" },
      { type: "dare", content: "Gọi điện cho crush và nói 'Em nhớ anh/chị'" },
      { type: "truth", content: "Khoảnh khắc đáng xấu hổ nhất ở trường?" },
      { type: "dare", content: "Ăn một thìa muối hoặc đường" },
      { type: "truth", content: "Bạn thích ai trong nhóm này nhất?" },
      { type: "dare", content: "Hát một bài hát mà không có nhạc nền" },
      { type: "truth", content: "Bí mật gì bạn chưa bao giờ kể ai?" },
      { type: "dare", content: "Chụp ảnh selfie xấu nhất có thể và đăng story" },
      { type: "truth", content: "Bạn đã bao giờ thích bạn của bạn thân không?" },
      { type: "dare", content: "Làm 20 cái hít đất ngay bây giờ" },
      { type: "truth", content: "Gọi điện mời cưới người yêu cũ hoặc uống một ly" },
      { type: "dare", content: "Gọi cho người yêu cũ xin quay lại hoặc uống 3 ly" },
      { type: "truth", content: "Người tóc ngắn nhất uống với người tóc dài nhất" },
      { type: "dare", content: "Ai có mối tình dài nhất thì uống" },
      { type: "truth", content: "Giữ lại lá bài và có quyền chọn người khác thực hiện thử thách thay 1 lần" },
      { type: "dare", content: "Bị bịt mắt sờ tay và đoán người, đoán sai thì uống" },
      { type: "truth", content: "Chơi trò chơi truyền giấy bằng miệng, cặp đôi làm rơi giấy thì uống" },
      { type: "dare", content: "Chọn 1 người khác chơi oẳn tì xì, thua thì uống" },
      { type: "truth", content: "Kể 3 điểm tốt nhất của người yêu cũ hoặc uống" },
      { type: "dare", content: "Hôn một người cùng giới hoặc bất kỳ ai, bất cứ chổ nào cũng được" },
      { type: "truth", content: "Đọc to rõ ràng 5 điều Bác Hồ dạy, sai thì uống" },
      { type: "dare", content: "Chạy quanh phòng bắt chước con khỉ" },
      { type: "truth", content: "Khoe 3 bước ảnh gần nhất trong diện thoại hoặc uống" },
      { type: "dare", content: "Ôm người bên cạnh 3p hoặc uống" },
      { type: "truth", content: "Hôn người đối diện hoặc uống 2 ly" },
      { type: "dare", content: "Hôn người khác giới hoặc uống 3 ly" },
      { type: "truth", content: "Thơm má người bên trá hoặc uống" },
      { type: "dare", content: "Trả lời câu hỏi 'Có muốn quay lại với người yêu cũ không'" },
      { type: "truth", content: "Gọi điện nói nhớ người yêu cũ hoặc uống 3 ly" },
      { type: "dare", content: "Gọi cho 1 người khác giới trong danh bạ và nói là mình đang say" },
      { type: "truth", content: "Kể về bí mật của bạn mà chưa ai biết" },
      { type: "dare", content: "Gọi cho người yêu cũ hỏi có khỏe không" },
      { type: "truth", content: "Gọi cho người yêu cũ và hỏi có muốn quay lại không" },
      { type: "dare", content: "Trả lời chủ tịch nước Việt Nam hiện tại là ai, sai thì uống" },
      { type: "truth", content: "Mũi chạm mũi người đối diện trong 15s" },
      { type: "dare", content: "Thả tim 15 ảnh trên mạng xã hội của người khác giới xinh nhất trên story hiện tại" },
      { type: "truth", content: "Kể tên 5 hảng BCS sai thì uống" },
      { type: "dare", content: "Kể về 5 tư thế mà bạn thích" },
      { type: "truth", content: "Trả lời câu hỏi 'Bạn có thích người khác giới nào trong đây không' hoặc uống 3 ly" },
      { type: "dare", content: "Đọc lại tin nhắn cuối cùng với người yêu cũ hoặc uống 2 ly" },
      { type: "truth", content: "Gọi video call cho người yêu cũ trong 10s hoặc uống 3 ly" },
      { type: "truth", content: "Bạn vẫn còn tình cảm với người yêu cũ không?" },
      { type: "dare", content: "Mô tả một kỷ niệm bạn nhớ nhất với người yêu cũ" },
      { type: "dare", content: "Thử gọi người yêu cũ và nói 'Anh/Em sắp kết hôn'" },
      { type: "truth", content: "Bạn có quay lại nếu người yêu cũ chủ động không?" },
      { type: "dare", content: "Đăng status 'Nhớ người yêu cũ quá' lên Facebook hoặc uống" },
      { type: "dare", content: "Cùng cả nhóm đếm từ 1 đến 20, ai sai thì uống" },
      { type: "dare", content: "Người có sinh nhật gần nhất uống 2 ly" },
      { type: "dare", content: "Tất cả con trai cụng ly uống, ai không uống thì trừ điểm" },
      { type: "dare", content: "Chơi trò nói thật: Mỗi người nói 1 sự thật về người bên trái" },
      { type: "dare", content: "Người có người yêu hiện tại uống thay người độc thân" },
      { type: "dare", content: "Chọn 1 người: Nếu đoán sai nghề nghiệp, bạn phải uống" },
      { type: "dare", content: "Ai từng hôn trong lần gặp đầu tiên thì uống" },
      { type: "truth", content: "Bạn từng có cảm xúc với người cùng giới chưa?" },
      { type: "dare", content: "Tỏ tình với người đối diện như thật trong 15s" },
      { type: "dare", content: "Hôn trán người ngồi bên trái hoặc uống" },
      { type: "truth", content: "Bạn còn trinh/trong trắng không?" },
      { type: "dare", content: "Để người khác gọi video và giới thiệu bạn là 'crush mới'" },
      { type: "truth", content: "Điều kỳ quặc nhất bạn từng làm khi yêu?" },
      { type: "dare", content: "Hôn lên tay người bạn chọn trong bàn" },
      { type: "dare", content: "Bịt mắt và đoán người khác bằng cách sờ tóc/mặt" },
      { type: "dare", content: "Đọc 1 tin nhắn cũ của bạn với người yêu cũ" },
      { type: "truth", content: "Ai trong bàn này bạn sẽ không bao giờ hẹn hò?" },
      { type: "dare", content: "Bắt chước một người nổi tiếng tỏ tình với ai đó trong bàn" },
      { type: "dare", content: "Gọi cho phụ huynh và nói 'Con yêu bố/mẹ nhiều lắm' ngay lúc này" },
      { type: "truth", content: "Nếu phải hẹn hò với người trong bàn, bạn chọn ai?" },
      { type: "dare", content: "Thể hiện một tư thế yoga sexy trong 10s" },
      { type: "dare", content: "Mô phỏng một cảnh hôn trong phim yêu thích" },
      { type: "truth", content: "Bạn đã từng stalk người yêu cũ bao giờ chưa?" },
      { type: "truth", content: "Điều gì khiến bạn chia tay người yêu cũ?" },
      { type: "dare", content: "Gọi cho người yêu cũ và nói 'Anh/Em vẫn còn tình cảm'" },
      { type: "dare", content: "Tìm Facebook người yêu cũ và like 3 ảnh gần nhất" },
      { type: "dare", content: "Gửi tin nhắn 'Em/Anh nhớ người cũ' cho một người bạn thân" },
      { type: "truth", content: "Bạn đã từng quay lại với người yêu cũ chưa?" },
      { type: "dare", content: "Gọi cho người yêu hiện tại (nếu có) và nói 'Anh/Em yêu người cũ hơn'" },
      { type: "truth", content: "Bạn từng quan hệ ở nơi công cộng chưa?" },
      { type: "dare", content: "Hôn tay người đối diện như trong phim cổ điển" },
      { type: "dare", content: "Diễn cảnh tỏ tình và hôn như phim Hàn" },
      { type: "truth", content: "Bạn từng dùng dating app nào chưa? Đã gặp ai chưa?" },
      { type: "dare", content: "Nằm vào lòng người khác giới trong bàn 10 giây" },
      { type: "truth", content: "Lần đầu bạn hôn là khi nào?" },
      { type: "dare", content: "Lấy son tô môi cho người bên cạnh (nam hoặc nữ)" },
      { type: "truth", content: "Bạn đã từng lén hôn ai chưa?" },
      { type: "dare", content: "Làm động tác sexy với người được chọn trong bàn" },
      { type: "dare", content: "Cạn ly cùng người ngồi đối diện" },
      { type: "dare", content: "Rót rượu/beer cho tất cả mọi người" },
      { type: "truth", content: "Bạn từng say xỉn và làm gì khiến bạn hối hận?" },
      { type: "dare", content: "Chơi oẳn tù tì với 1 người, ai thua uống 2 ly" },
      { type: "dare", content: "Tự chọn 2 người và yêu cầu họ cụng ly uống cùng bạn" },
      { type: "truth", content: "Ai là người uống tệ nhất trong bàn này?" },
      { type: "dare", content: "Người có tên dài nhất uống 1 ly" },
      { type: "dare", content: "Người mặc áo đen (hoặc màu bất kỳ) uống 2 ly" },
      { type: "dare", content: "Đổ rượu vào nắp chai và uống thay shot" },
      { type: "truth", content: "Bạn từng crush người đang có người yêu chưa?" },
      { type: "dare", content: "Đọc to 5 dòng gần nhất bạn nhắn trên Messenger" },
      { type: "dare", content: "Đóng vai mẹ bạn và gọi cho một người bất kỳ trong nhóm" },
      { type: "dare", content: "Gọi điện mượn tiền người yêu cũ" },
      { type: "truth", content: "Bạn từng nhắn tin 'Anh/Em đang tắm' mà không tắm thật chưa?" },
      { type: "dare", content: "Đọc tên 5 loại bao cao su hoặc uống" },
      { type: "truth", content: "Bạn đã từng yêu ai mà bạn bè không ủng hộ không?" },
      { type: "dare", content: "Mở ảnh gần nhất và mô tả nội dung trước mọi người" },

    ],
  },
  lover: {
    title: "Chơi với Người Yêu",
    icon: Heart,
    color: "bg-pink-500",
    questions: [
      { type: "truth", content: "Điều gì về em khiến anh/chị yêu nhất?" },
      { type: "dare", content: "Hôn má người yêu 10 lần liên tiếp" },
      { type: "truth", content: "Kỷ niệm đẹp nhất của chúng ta là gì?" },
      { type: "dare", content: "Viết 'I love you' lên tay bằng son môi" },
      { type: "truth", content: "Anh/chị có bao giờ ghen với ai không?" },
      { type: "dare", content: "Massage vai cho người yêu trong 5 phút" },
      { type: "truth", content: "Điều gì về em khiến anh/chị khó chịu nhất?" },
      { type: "dare", content: "Hát một bài tình ca cho người yêu nghe" },
      { type: "truth", content: "Anh/chị mơ về tương lai chúng ta như thế nào?" },
      { type: "dare", content: "Ôm chặt người yêu trong 2 phút không nói gì" },
      { type: "truth", content: "Lần đầu tiên yêu em, anh/chị nghĩ gì?" },
      { type: "dare", content: "Làm một điệu nhảy lãng mạn cùng nhau" },
    ],
  },
  stranger: {
    title: "Chơi với Người Lạ",
    icon: UserX,
    color: "bg-purple-500",
    questions: [
      { type: "truth", content: "Công việc mơ ước của bạn là gì?" },
      { type: "dare", content: "Bắt tay 5 người lạ và chào hỏi" },
      { type: "truth", content: "Điều gì khiến bạn hạnh phúc nhất?" },
      { type: "dare", content: "Hát happy birthday cho người ngồi cạnh" },
      { type: "truth", content: "Sở thích kỳ lạ nhất của bạn là gì?" },
      { type: "dare", content: "Kể một câu chuyện cười trong 2 phút" },
      { type: "truth", content: "Bạn sợ điều gì nhất trên đời?" },
      { type: "dare", content: "Bắt chước giọng nói của một người nổi tiếng" },
      { type: "truth", content: "Kỷ niệm tuổi thơ đẹp nhất của bạn?" },
      { type: "dare", content: "Nhảy như một con robot trong 1 phút" },
      { type: "truth", content: "Nếu có siêu năng lực, bạn muốn có gì?" },
      { type: "dare", content: "Vẽ một bức tranh bằng chân" },
    ],
  },
}

export default function TruthDare() {
  const [gameMode, setGameMode] = useState<string | null>(null)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [currentCards, setCurrentCards] = useState<any[]>([])
  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const [usedCards, setUsedCards] = useState<number[]>([])
  const [showCardModal, setShowCardModal] = useState(false)
  const [activeCardContent, setActiveCardContent] = useState<string | null>(null)


  const startGame = (mode: string) => {
    setGameMode(mode)
    const shuffledCards = [...gameData[mode as keyof typeof gameData].questions].sort(() => Math.random() - 0.5)
    setCurrentCards(shuffledCards)
    setIsGameStarted(true)
    setUsedCards([])
    setFlippedCard(null)
  }

  // const flipCard = (index: number) => {
  //   if (usedCards.includes(index) || flippedCard === index) return

  //   setFlippedCard(index)

  //   // Sau 3 giây, đánh dấu thẻ đã sử dụng
  //   setTimeout(() => {
  //     setUsedCards((prev) => [...prev, index])
  //     setFlippedCard(null)

  //     // Nếu đã sử dụng hết thẻ, reset game
  //     if (usedCards.length + 1 >= currentCards.length) {
  //       setTimeout(() => {
  //         resetGame()
  //       }, 1000)
  //     }
  //   }, 3000)
  // }

  const flipCard = (index: number) => {
    if (usedCards.includes(index) || flippedCard === index) return

    setFlippedCard(index)
    setActiveCardContent(currentCards[index].content)
    setShowCardModal(true)

    setTimeout(() => {
      setUsedCards((prev) => [...prev, index])
      setFlippedCard(null)

      if (usedCards.length + 1 >= currentCards.length) {
        setTimeout(() => {
          resetGame()
        }, 1000)
      }
    }, 3000)
  }


  const resetGame = () => {
    setIsGameStarted(false)
    setGameMode(null)
    setCurrentCards([])
    setUsedCards([])
    setFlippedCard(null)
  }

  const goBack = () => {
    setIsGameStarted(false)
    setGameMode(null)
  }

  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 pt-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🎮 Thật hay Thách bởi Bunz</h1>
            <p className="text-lg md:text-xl text-white/90">Chọn chế độ chơi và bắt đầu cuộc vui!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {Object.entries(gameData).map(([key, data]) => {
              const IconComponent = data.icon
              return (
                <Card
                  key={key}
                  className="cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0"
                  onClick={() => startGame(key)}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`${data.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{data.title}</h3>
                    <p className="text-gray-600 text-sm">{data.questions.length} thẻ bài thú vị</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const currentGameData = gameData[gameMode as keyof typeof gameData]
  const IconComponent = currentGameData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <Button
            onClick={goBack}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            ← Quay lại
          </Button>

          <div className="flex items-center gap-3">
            <div className={`${currentGameData.color} w-10 h-10 rounded-full flex items-center justify-center`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">{currentGameData.title}</h2>
          </div>

          <Button
            onClick={resetGame}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {!isGameStarted ? (
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Sẵn sàng chơi?</h3>
              <p className="text-white/80 mb-6">
                Nhấn nút bắt đầu để bắt đầu trò chơi. Lật thẻ và thực hiện thử thách!
              </p>
              <Button
                onClick={() => setIsGameStarted(true)}
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 font-bold px-8 py-3"
              >
                <Play className="w-5 h-5 mr-2" />
                Bắt đầu chơi
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Game Stats */}
            <div className="text-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block">
                <p className="text-white font-semibold">
                  Đã chơi: {usedCards.length} / {currentCards.length}
                </p>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentCards.map((card, index) => (
                <div
                  key={index}
                  className={`relative h-32 md:h-40 cursor-pointer transform transition-all duration-500 ${usedCards.includes(index) ? "opacity-50 scale-95" : "hover:scale-105"
                    }`}
                  onClick={() => flipCard(index)}
                >
                  <div className={`card-inner ${flippedCard === index ? "flipped" : ""}`}>
                    {/* Mặt trước */}
                    <div className="card-face card-front bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg flex items-center justify-center p-4">
                      <div className="text-center">
                        <div
                          className={`${currentGameData.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}
                        >
                          <span className="text-white font-bold text-lg">?</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">
                          {card.type === "truth" ? "THẬT" : "THÁCH"}
                        </p>
                      </div>
                    </div>

                    {/* Mặt sau */}
                    <div
                      className={`card-face card-back ${currentGameData.color} rounded-xl shadow-lg flex items-center justify-center p-4`}
                    >
                      <p className="text-white text-center text-sm md:text-base font-medium leading-tight">
                        {card.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {usedCards.length === currentCards.length && (
              <div className="text-center mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">🎉 Hoàn thành!</h3>
                  <p className="text-white/80 mb-4">Bạn đã chơi hết tất cả thẻ bài!</p>
                  <Button onClick={resetGame} className="bg-white text-purple-600 hover:bg-white/90 font-bold">
                    Chơi lại
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {showCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-[90%] text-center relative shadow-2xl">
            <button
              onClick={() => setShowCardModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <p className="text-lg font-medium text-gray-800">{activeCardContent}</p>
          </div>
        </div>
      )}

    </div>
  )
}
