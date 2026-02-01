from rembg import remove
import streamlit as st
from PIL import Image

SUPPORTED_FILE_TYPES = ['png', 'jpg', 'jpeg']

def main():
    st.set_page_config(page_title="Remove Background", page_icon="🐗")
    st.markdown("# 🐗 Remove Image Background")
    st.markdown("Upload an image to remove its background")
    
    # Verificar dependencias al inicio
    try:
        # Testear la importación de onnxruntime, sino da error
        import onnxruntime as ort
        st.success("✅ Dependencies loaded successfully")
    except ImportError as e:
        st.error(f"❌ Missing dependency: {e}")
        st.info("Please install required packages: pip install rembg onnxruntime")
        return
    
    uploaded_file = st.file_uploader('**Choose and Upload Image file here**', type=SUPPORTED_FILE_TYPES)
    
    if uploaded_file is not None:
        # Mostrar imagen original
        st.image(uploaded_file, caption='Original Image', use_container_width=True)
        
        remove_button = st.button('Remove Background')
        
        if remove_button:
            with st.spinner('Removing background... This may take a few seconds'):
                try:
                    # Resetear el puntero del archivo
                    uploaded_file.seek(0)
                    input_image = uploaded_file.read()
                    
                    # Remover el fondo
                    output_image = remove(input_image)
                    
                    # Mostrar imagen procesada
                    col1, col2 = st.columns(2)
                    
                    with col1:
                        st.image(uploaded_file, caption='Original Image', use_container_width=True)
                    
                    with col2:
                        st.image(output_image, caption='Image with Background Removed', use_container_width=True)
                        
                        # Botón de descarga
                        st.download_button(
                            label='📥 Download Processed Image',
                            data=output_image,
                            file_name='background_removed.png',
                            mime='image/png'
                        )
                    
                except Exception as e:
                    st.error(f"❌ Error processing image: {str(e)}")
                    st.info("""
                    **Troubleshooting tips:**
                    1. Make sure all dependencies are installed: `pip install rembg onnxruntime streamlit pillow`
                    2. Try installing CPU version: `pip install rembg[cpu]`
                    3. Restart your Streamlit app after installation
                    """)

if __name__ == '__main__':
    main()
#streamlit run "c:/ruta/background.py"