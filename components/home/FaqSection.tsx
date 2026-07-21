import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FAQS } from '@/constants/madsContent';

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <View className="px-6 mt-4 mb-2">
            <Text className="text-2xl font-quicksand-bold text-dark-100 mb-4">
                Preguntas frecuentes
            </Text>
            <View className="gap-y-3">
                {FAQS.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <TouchableOpacity
                            key={faq.question}
                            onPress={() => setOpenIndex(isOpen ? null : index)}
                            className="bg-white rounded-2xl p-4 border border-gray-100/10"
                            activeOpacity={0.8}
                        >
                            <View className="flex-row items-center justify-between">
                                <Text className="flex-1 text-sm font-quicksand-bold text-dark-100 pr-3">
                                    {faq.question}
                                </Text>
                                <Text className="text-primary text-lg font-quicksand-bold">
                                    {isOpen ? "–" : "+"}
                                </Text>
                            </View>
                            {isOpen && (
                                <Text className="text-xs font-quicksand-medium text-gray-100 leading-relaxed mt-3">
                                    {faq.answer}
                                </Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default FaqSection;
