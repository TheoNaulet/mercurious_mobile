import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import StatsBlock from '../utils/StatsBlock';

const ParentComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({ title: '', data: [] });

    const handleOpenModal = (title: string, data: Array<any>) => {
        setModalData({ title, data });
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <StatsBlock
                followers={followers}
                followings={followings} 
                handleOpenModal={handleOpenModal}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                {/* Votre contenu de modal ici, vous pouvez utiliser modalData pour afficher les données */}
            </Modal>
        </View>
    );
}

export default ParentComponent;
